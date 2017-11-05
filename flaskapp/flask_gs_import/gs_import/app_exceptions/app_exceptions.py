class AppException(Exception):
    """Base class for app exceptions"""
    pass


#####################################################
#              General exceptions                   #
#####################################################

class AuthenticationException(AppException):
    def __init__(self, username):
        AppException.__init__(self, 'Could not authenticate user {}'.format(username))
