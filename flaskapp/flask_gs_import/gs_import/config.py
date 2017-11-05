import os


class Config(object):
    DEBUG = False
    GS_USERNAME = os.environ['GS_USERNAME']
    GS_PASSWORD = os.environ['GS_PASSWORD']
    GEOSERVER_DATA_DIR = '/opt/geoserver/data_dir/data'
    SECRET_KEY = 'kljsdf8797234nbkshd__sdfjjsdf'
    TESTING = False


class ProductionConfig(Config):
    UPLOADS_DEFAULT_DEST = os.path.join('tmp_uploads')


class DevelopmentConfig(Config):
    DEBUG = True
    UPLOADS_DEFAULT_DEST = os.path.join('tmp_uploads')
