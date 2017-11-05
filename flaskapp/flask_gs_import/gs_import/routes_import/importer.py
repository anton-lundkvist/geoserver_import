from flask import request, Blueprint
from ..response_types.json_response_types import success_response, error_response
from .. import upload_file_set, app, token_required
from flask_uploads import UploadNotAllowed
from ..file_utils import shp_file_utils, file_utils
import os
import datetime
import shutil
from collections import OrderedDict

import_blueprint = Blueprint(name='import_blueprint', import_name=__name__)


@import_blueprint.route('', methods=['GET'])
def get_dirs_and_files():
    gs_data_dir = app.config['GEOSERVER_DATA_DIR']
    tree = generate_tree(gs_data_dir)
    return success_response(tree)


@import_blueprint.route('', methods=['POST'])
@token_required
def upload_file():
    time_stamp_string = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S-%f')
    unzip_dir = os.path.join(app.config['UPLOADS_DEFAULT_DEST'], 'shp_files', time_stamp_string)
    gs_data_dir = app.config['GEOSERVER_DATA_DIR']
    try:
        if 'file' in request.files:
            file_name = upload_file_set.save(request.files['file'], time_stamp_string)
            upload_file_path = upload_file_set.path(file_name)
            file_ext = os.path.splitext(upload_file_path)[1]
            dst_folder_name = '{}-{}'.format(request.files['file'].filename.split(str(file_ext))[0], time_stamp_string)
            unzip_dir = os.path.join(app.config['UPLOADS_DEFAULT_DEST'], 'shp_files', dst_folder_name)

            if file_ext == '.zip':
                shp_file_names = file_utils.unzip(upload_file_path, unzip_dir)
                if not shp_file_utils.is_shp_file(shp_file_names):
                    return error_response(
                        'Not a valid shape file, found {} but only shape file formats are allowed.'.format(
                            ', '.join(shp_file_names)))
                else:
                    try:
                        shutil.move(unzip_dir, gs_data_dir)
                    except shutil.Error as e:
                        return error_response('File could not be uploaded, please try again')
                    return success_response(dst_folder_name)
            elif file_ext == '.tif':
                tif_dir = os.path.join(gs_data_dir, dst_folder_name)
                if not os.path.exists(tif_dir):
                    os.makedirs(tif_dir)
                try:
                    shutil.move(upload_file_path, tif_dir)
                except shutil.Error as e:
                    return error_response('File could not be uploaded, please try again')
                return success_response(dst_folder_name)

        return error_response('Parameter file is required')
    except UploadNotAllowed:
        return error_response('File extension not valid, only .zip and .tif extensions are allowed')
    except Exception as e:
        return error_response('Internal server error, please contact administrator')
    finally:
        pass
        file_utils.remove_dir_and_contents(
            os.path.join(app.config['UPLOADS_DEFAULT_DEST'], 'uploadFileSet', time_stamp_string))
        file_utils.remove_dir_and_contents(unzip_dir)


def generate_tree(path):
    d = {'name': os.path.basename(path)}
    if os.path.isdir(path):
        d['type'] = "directory"
        d['children'] = [generate_tree(os.path.join(path, x)) for x in os.listdir(path)]
    else:
        d['type'] = "file"
    return d
