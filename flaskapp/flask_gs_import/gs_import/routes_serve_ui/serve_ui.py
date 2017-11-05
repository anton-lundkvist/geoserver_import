from flask import send_from_directory, Blueprint
import os
from .. import app

serve_ui_blueprint = Blueprint(name='serve_ui_blueprint', import_name=__name__)


@serve_ui_blueprint.route('/', defaults={'path': ''})
@serve_ui_blueprint.route('/<path:path>')
def serve(path):
    print(app.instance_path)
    #app.logger.info('STATIC FOLDER:' + app.static_folder)
    #app.logger.info('Requesting path: ' + path)
    if path == "":
        #app.logger.info('Path was empty, sending index file')
        #app.logger.info('\n')
        return send_from_directory(app.static_folder, 'index.html')
    else:
        #app.logger.info('Path param was not empty')
        #app.logger.info('Searching for path: ' + os.path.join(app.static_folder, path))
        if os.path.exists(os.path.join(app.static_folder, path)):
            #app.logger.info('Path exists: ' + path)
            #app.logger.info('\n')
            return send_from_directory(app.static_folder, path)
        else:
            #app.logger.info('Path did not exist, sending index file: ' + path)
            #app.logger.info('\n')
            return send_from_directory(app.static_folder, 'index.html')
