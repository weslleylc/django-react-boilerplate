from corsheaders.defaults import default_headers

from settings.base import *


DEBUG = False

# fmt: off
ALLOWED_HOSTS = env.list(
    "DJANGO_ALLOWED_HOSTS",
    default=["office.instagramania.test.TODO.com", "instagramania.test.TODO.com"],

)
# fmt: on

# Static site url, used when we need absolute url but lack request object, e.g. in email sending.
SITE_URL = env.str("RAZZLE_SITE_URL", default="https://instagramania.test.TODO.com")
DJANGO_SITE_URL = env.str(
    "RAZZLE_BACKEND_SITE_URL", default="https://office.instagramania.test.TODO.com"
)

# fmt: off
CSRF_COOKIE_DOMAIN = env.str(
    "DJANGO_CSRF_COOKIE_DOMAIN",
    default=".instagramania.test.TODO.com"
)
# fmt: on

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

EMAIL_HOST = env.str("DJANGO_EMAIL_HOST", default="smtp.sparkpostmail.com")
EMAIL_PORT = env.int("DJANGO_EMAIL_PORT", default=587)
EMAIL_HOST_USER = env.str("DJANGO_EMAIL_HOST_USER", default="SMTP_Injection")
EMAIL_HOST_PASSWORD = env.str("DJANGO_EMAIL_HOST_PASSWORD", default="TODO (api key)")

STATIC_URL = env.str("DJANGO_STATIC_URL", default="/assets/")

# Production logging - all INFO and higher messages go to info.log file. ERROR and higher messages additionally go to
#  error.log file
LOGGING["loggers"][""] = {
    "handlers": ["console"],
    "level": "INFO",
    "filters": ["require_debug_false"],
}

if env.str("DJANGO_DISABLE_FILE_LOGGING", default="n") != "y":
    # Add file handlers
    LOGGING["handlers"].update(
        {
            "info_log": {
                "level": "INFO",
                "class": "logging.handlers.WatchedFileHandler",
                "filename": "/var/log/instagramania/info.log",
                "formatter": "default",
            },
            "error_log": {
                "level": "ERROR",
                "class": "logging.handlers.WatchedFileHandler",
                "filename": "/var/log/instagramania/error.log",
                "formatter": "default",
            },
        }
    )
    LOGGING["loggers"][""]["handlers"] = ["info_log", "error_log"]

else:
    LOGGING["handlers"].update(
        {"console": {"class": "logging.StreamHandler", "formatter": "default"}}
    )

# CORS overrides
CORS_ORIGIN_ALLOW_ALL = False
CORS_EXPOSE_HEADERS = default_headers
CORS_ORIGIN_WHITELIST = [
    "https://{host}".format(host=host)
    for host in env.list("DJANGO_CORS_ORIGIN_WHITELIST", default=ALLOWED_HOSTS)
]

# CSRF Trusted hosts
CSRF_TRUSTED_ORIGINS = env.list("DJANGO_CSRF_TRUSTED_ORIGINS", default=ALLOWED_HOSTS)


# Enable S3 storage
DEFAULT_FILE_STORAGE = "instagramania.storages.MediaStorage"
MEDIA_ROOT = env.str("DJANGO_MEDIA_ROOT", default="")
AWS_STORAGE_BUCKET_NAME = env.str(
    "DJANGO_AWS_STORAGE_BUCKET_NAME", default="instagramania-staging"
)
AWS_ACCESS_KEY_ID = env.str("DJANGO_AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = env.str("DJANGO_AWS_SECRET_ACCESS_KEY")
