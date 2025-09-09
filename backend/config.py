from dotenv import load_dotenv
import os

load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}"
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "").split(",")
DATABASE_URL = os.getenv("DATABASE_URL")