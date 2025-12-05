export default function AuthButtons({ goToLogin, goToRegister }) {
  return (
    <div className="flex-gap">
      <button className="button-secondary" onClick={goToLogin}>
        Войти
      </button>
      <button className="button-secondary" onClick={goToRegister}>
        Зарегистрироваться
      </button>
    </div>
  );
}