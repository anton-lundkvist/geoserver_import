import zipfile
from ..app_exceptions.app_exceptions import AppException
import shutil
import os


def unzip(file_path, unzip_path):
    if zipfile.is_zipfile(file_path):
        with zipfile.ZipFile(file_path, "r") as z:
            z.extractall(unzip_path)
            names = z.namelist()
            z.close()
            return names
    raise AppException('File is not a valid zip file, unable to unzip!')


def remove_dir_and_contents(dir_path):
    shutil.rmtree(os.path.join(dir_path), ignore_errors=True)


def remove_zip(file_path):
    os.remove(file_path)
