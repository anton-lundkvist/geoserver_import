import os
from ..app_exceptions.app_exceptions import AppException
from .. import app

VALID_EXTENSIONS = (
    '.shp', '.shx', '.dbf', '.prj', '.sbn', '.sbx', '.fbn', '.fbx', '.ain', '.aih', '.ixs', '.mxs', '.atx', '.shp.xml',
    '.cpg', '.qix', '.csv', '.txt')


def is_shp_file(file_names):
    file_extensions = [os.path.splitext(file_name)[1] for file_name in file_names]
    for ex in file_extensions:
        if ex not in VALID_EXTENSIONS:
            return False
    return True


def get_shapefile_name(file_names):
    for name in file_names:
        extension = os.path.splitext(name)[1]
        if extension == '.shp':
            return name.split('.shp')[0]
    raise AppException('Could not find shapefile!')
