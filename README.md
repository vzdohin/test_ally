# Задание

Реализация формы авторизации с использованием Next.js и React Hook Form.

## Описание

Форма реализована в два шага:

1. **Первый шаг**:

   - Поле ввода электронной почты (Email).
   - Кнопка для перехода на второй шаг.

2. **Второй шаг**:
   - Поле ввода пароля, скрытое звездочками.
   - Кнопка "показать" для отображения введенного пароля.
   - Кнопка для отправки формы.

Отправка формы осуществляется на произвольный URL, имитирующий взаимодействие с сервером.

## Реализованные дополнительные возможности

- Валидация электронной почты на первом шаге.
- Обработка и отображение ошибок, полученных от имитации сервера, с помощью React Hook Form.
- Мокирование успешного ответа от сервера для тестирования фронтенда без готового бэкенда.

## Деплой

[https://test-ally.vercel.app/](https://test-ally.vercel.app/)

## Установка

1. Клонировать репозиторий:

   ```bash
   git clone <repository-url>
   ```

2. Установить зависимости:

   ```bash
   npm install
   ```

3. Запустить проект:

   ```bash
   npm run dev
   ```

## Использование

Форма доступна по адресу `http://localhost:3000/` после запуска проекта.

- Введите ваш Email и нажмите "Next" для перехода ко второму шагу.
- Введите ваш пароль и используйте кнопку "показать", если необходимо увидеть введенные данные.
- Нажмите "Submit" для отправки формы. В случае успешной отправки появится сообщение с данными, в противном случае будет показано сообщение об ошибке.

## Тестирование

Для имитации ошибки сервера используйте Email `error@example.com`. В этом случае будет показано сообщение об ошибке.

## Валидация

Валидация Email осуществляется по следующим правилам:

- Должен быть в формате `index@mail.com`.
- Должен содержать символ `@`.
- Не должен быть пустым.

Пароль валидируется на минимальную длину в 6 символов.
