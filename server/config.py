import configparser
import os

from dotenv import load_dotenv

load_dotenv()

config = configparser.ConfigParser()
config.read(os.environ.get("SETTINGS_FILE", "settings.ini"))


database_connection_string = os.path.expandvars(
    config.get("database", "database_connection_string")
)
