import os


class Config(object):
    DEBUG = False
    USERNAME = os.environ['USERNAME']
    PASSWORD = os.environ['PASSWORD']
    GEOSERVER_DATA_DIR = '/opt/geoserver/data_dir/data'
    SECRET_KEY = 'kljsdf8797234nbkshd__sdfjjsdf'
    TESTING = False


class ProductionConfig(Config):
    UPLOADS_DEFAULT_DEST = os.path.join('tmp_uploads')


class DevelopmentConfig(Config):
    DEBUG = True
    UPLOADS_DEFAULT_DEST = os.path.join('tmp_uploads')
