<div align="center">

# Boro — ваш AI-оператор бизнеса

**Revenue Control + Boro** — AI-агент продаж, CRM, онлайн-запись и дашборд выручки для малого и среднего бизнеса в ОАЭ и СНГ.

Boro не просто отвечает на вопросы. Boro делает работу.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![MCP: 13 инструментов чтения](https://img.shields.io/badge/MCP-13_read_tools-6f42c1.svg)](docs/mcp/README.md)
[![REST API: v1](https://img.shields.io/badge/REST_API-v1-0a7d5a.svg)](docs/api/rest-v1.md)
[![Built in Dubai](https://img.shields.io/badge/Built_in-Dubai_🇦🇪-black.svg)](https://control.boardroom-ai.ae/?utm_source=github&utm_medium=readme_ru&utm_campaign=badge)
[![Official MCP Registry](https://img.shields.io/badge/MCP_Registry-io.github.boardroomgen--ai--ae%2Fboro--ai-1f6feb.svg)](https://registry.modelcontextprotocol.io/v0/servers?search=boro-ai)
[![Smithery](https://img.shields.io/badge/Smithery-listed-ff5601.svg)](https://smithery.ai/servers/boardroom-gen/revenue-control)
[![Glama](https://img.shields.io/badge/Glama-ownership_verified-2ea44f.svg)](https://glama.ai/mcp/connectors/io.github.boardroomgen-ai-ae/boro-ai)
[![GitHub stars](https://img.shields.io/github/stars/boardroomgen-ai-ae/boro-ai?style=social)](https://github.com/boardroomgen-ai-ae/boro-ai/stargazers)

[**Создать пространство бесплатно**](https://control.boardroom-ai.ae/register?utm_source=github&utm_medium=readme_ru&utm_campaign=cta) ·
[**Сайт**](https://control.boardroom-ai.ae/?utm_source=github&utm_medium=readme_ru&utm_campaign=site) ·
[**Подключение по MCP**](docs/mcp/README.md) ·
[**Примеры REST**](examples/README.md) ·
[**English**](README.md)

</div>

---

## Что это

Revenue Control — облачная мультиарендная платформа для бизнеса, который продаёт через переписку и звонки: салоны и клиники, агентства недвижимости, учебные центры, сервисные компании.

- **AI-агент продаж** отвечает клиентам в WhatsApp, Instagram, Telegram, чате на сайте и голосом, квалифицирует, записывает и передаёт человеку, когда это нужно.
- **CRM** — воронки, стадии, задачи, заметки и вся переписка в карточке сделки; агент заполняет её сам, пока разговаривает.
- **Онлайн-запись** — слоты, сотрудники, напоминания и подключение к системам записи, которыми уже пользуются салоны и клиники.
- **Дашборд выручки** — лиды, конверсия, «потерянные» без задачи, расход на рекламу против реальных сделок, выручка по источникам.
- **Boro** — оператор внутри кабинета: читает всё это и говорит, что требует вашего внимания сегодня.

В этом репозитории — **публичный слой для разработчиков**: документация, инструкции по подключению и примеры. Сам продукт работает как облачный сервис на [control.boardroom-ai.ae](https://control.boardroom-ai.ae/?utm_source=github&utm_medium=readme_ru&utm_campaign=what). Исходного кода платформы здесь нет.

## Подключите Claude, ChatGPT или Cursor к своему пространству за 3 минуты

Ваше пространство — это ещё и **MCP-сервер**. Любой MCP-клиент читает ваши лиды, воронку, диалоги AI-агента, звонки и цифры маркетинга по токену, который выпускаете вы.

1. Войдите в кабинет: **Интеграции → API и MCP → Boardroom MCP → «Получить токен MCP»**. Токен показывается один раз — скопируйте его.
2. Добавьте сервер в клиент:

```bash
claude mcp add --transport http boardroom https://control.boardroom-ai.ae/mcp \
  --header "Authorization: Bearer YOUR_MCP_TOKEN"
```

3. Спросите: *«Какие открытые лиды без задачи на дожим? Сначала те, что дольше всех ждут.»*

Инструкции: [Claude Code](docs/mcp/setup/claude-code.md) · [Claude Desktop](docs/mcp/setup/claude-desktop.md) · [Cursor](docs/mcp/setup/cursor.md) · [ChatGPT / OpenAI](docs/mcp/setup/chatgpt.md) (на английском)

**Безопасность заложена в устройство:**
- **Только чтение.** Инструментов записи в публичном MCP нет.
- **Один токен — одно пространство.** Пространство берётся из токена; аргументом инструмента на чужое пространство не сослаться.
- **Маскирование.** В списках телефоны и почта скрыты; полный контакт — только когда вы просите одну конкретную запись.
- **Журнал.** Каждое чтение записывается: инструмент, число строк, id записи. Без содержимого ответа и без персональных данных.
- **Токен выпускает владелец, и его можно отозвать.** У токена есть срок жизни, отзыв — в той же карточке.

## Что можно спросить

| Вопрос AI-клиенту или Boro | Статус |
|---|---|
| «Найди все лиды без дожима» | **Доступно** |
| «Покажи воронку: сколько сделок и на какую сумму по стадиям» | **Доступно** |
| «Кто писал на этой неделе, на каком языке и что хотел?» | **Доступно** |
| «Какая реклама принесла диалоги в этом месяце?» | **Доступно** |
| «Как прошли звонки сегодня: отвечено, пропущено, время разговора?» | **Доступно** |
| «Что требует моего внимания сегодня?» (Boro в кабинете) | **Доступно** |
| «Назначь встречу на завтра и передвинь сделку» (Boro в кабинете) | **Бета** — Boro готовит, вы подтверждаете |
| «Разбери почту и подготовь ответы» (Boro в кабинете) | **Бета** — только черновики, не отправляет |
| Те же действия через MCP (заметка, задача, стадия, теги) | **Скоро** — с предпросмотром и подтверждением |
| «Подготовь КП клиентам, которые ждут цены» | **Скоро** |

Все 13 инструментов MCP описаны по одному в [docs/mcp/tools](docs/mcp/tools/).

## REST API

```bash
curl -s https://control.boardroom-ai.ae/api/v1/leads?limit=5 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

`GET /api/v1/leads` · `GET /api/v1/deals` · `GET /api/v1/tasks` · `POST /api/v1/leads`

Ключ API создаётся в кабинете: **Настройки → API**. Справочник — [docs/api/rest-v1.md](docs/api/rest-v1.md), примеры на curl, JavaScript и Python и шаблоны n8n и Make — в [examples/](examples/README.md).

## Работает с

WhatsApp · Instagram · Telegram · чат на сайте · голос · Kommo / amoCRM · Altegio · Zoho Books · Bayut / Property Finder · реклама Meta, Google, TikTok · любой MCP-клиент · n8n · Make

Часть каналов требует одобрения провайдера канала для вашего бизнеса. Кабинет показывает честный статус каждого подключения: *Работает*, *Нужна настройка*, *Черновик* или *Недоступно*.

## Дорожная карта

| | Что | Статус |
|---|---|---|
| ✅ | MCP-сервер, 13 инструментов чтения, токены от владельца | Доступно |
| ✅ | REST API v1: лиды, сделки, задачи, создание лида | Доступно |
| ✅ | Виджет чата для сайта | Доступно |
| 🧪 | Действия Boro в кабинете (запись, стадия, задача) с подтверждением | Бета |
| 🧪 | Сводка почты и черновики ответов от Boro | Бета |
| 🔜 | Инструменты записи в MCP с предпросмотром и подтверждением | Скоро |
| 🔜 | Демо-песочница MCP с вымышленной CRM, без регистрации | Скоро |
| 🔜 | Официальный MCP Registry и каталоги клиентов | Скоро |
| 💭 | Boro Skills — отраслевые наборы: клиники, салоны, недвижимость | Изучаем |

## Понравилось? Поставьте звезду ⭐

Звезда помогает другим владельцам бизнеса и разработчикам найти рабочую связку MCP и CRM.

## Безопасность

Нашли уязвимость — см. [SECURITY.md](SECURITY.md). Пожалуйста, не открывайте для этого публичный issue.

## Лицензия

Документация и примеры — [Apache 2.0](LICENSE). «Boro», «Boardroom» и «Revenue Control» — названия Boardroom AI; лицензия распространяется только на этот репозиторий, не на облачный сервис и не на бренд.

---

<div align="center">

**Сделано в Дубае** 🇦🇪 — Boardroom AI · [control.boardroom-ai.ae](https://control.boardroom-ai.ae/?utm_source=github&utm_medium=readme_ru&utm_campaign=footer)

</div>
