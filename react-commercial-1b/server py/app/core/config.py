from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    jwt_secret: str
    keep_alive_url: str

    mysql_host: str
    mysql_port: int = 3306
    mysql_user: str
    mysql_password: str
    mysql_database: str

    smtp_user: str
    smtp_pass: str

    app_env: str = "development"
    port: int = 8000

    client_origins: str = "https://icvacations.netlify.app,http://localhost:5173"

    @property
    def allowed_origins(self) -> list[str]:
        return [o.strip() for o in self.client_origins.split(",")]


settings = Settings()