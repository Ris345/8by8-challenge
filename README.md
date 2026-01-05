# 8by8 Challenge

Welcome to the repository for the 8by8 Challenge! The 8by8 Challenge is a web application intended to foster civic engagement by allowing users to perform various actions such as registering to vote or signing up for election reminders in exchange for badges. Users can also share their challenge with friends via social media. When an invited user registers to vote, or takes another similar action, the inviter also receives a badge. When a user receives 8 badges within 8 days, they have completed their challenge.

Currently, we are working on migrating the existing application to Next.js and TypeScript, as well as fixing bugs, improving accessibility, etc. For the existing application's source code, please visit [https://github.com/8by8-org/web-app](https://github.com/8by8-org/web-app).

## Requirements

- Node.js 18.17+
- Docker

## Getting-Started

1.  Install Node.js version 18.17 or higher. https://nodejs.org/en/download/package-manager
2.  Install Docker. https://www.docker.com/. If you are running Docker on Windows, note that you will need to have WSL 2 enabled. Please see this documentation for more information on setting up WSL 2. https://learn.microsoft.com/en-us/windows/wsl/install
3.  Fork this repository and clone your fork to your machine. In the terminal, navigate into the project directory and run `npm install`. This will install the project's dependencies.
4.  Copy the contents of `.env.example` into a file named `.env` (this should go in the root directory of the project). Please note that you should NOT edit the `.env.example` file directly.
5.  Start Docker (you will need Docker running each time you start the application).
6.  Run the command `npm run kv:start`. This will start Docker containers that emulate the functionality of [Vercel KV](https://vercel.com/docs/storage/vercel-kv) locally, which is used for applying rate limitations to certain routes.
7.  Copy the url and token output by this command and, in your `.env` file, paste into the environment variables `KV_REST_API_URL` and `KV_REST_API_TOKEN`, respectively.
8.  Run the command `npm run supabase-dev:start`. This will start a local Supabase instance. When this command is successful, its output will include an API URL, an anon key, and a service_role key. Paste these values into your `.env` file, assigning them to the variables `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`, respectively.
9.  Visit [this page](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) to get dummy keys for Cloudflare Turnstile. In your `.env` file, add the site key that always passes to `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, and add the secret key that always passes to `TURNSTILE_SECRET_KEY`.
10. Run `npm run create-cryptokey` to generate an encryption key. The key will be automatically copied to the clipboard and, again in the `.env` file, can be pasted into the environment variable `VOTER_REGISTRATION_REPO_ENCRYPTION_KEY`. Repeat this process for the `CRYPTO_KEY_COOKIES` variable.
11. The environment variable `GOOGLE_MAPS_API_KEY` can be any string (the application has a graceful fallback UI for address validation failure), or you can get an API key for the Google Address Validation API from the [Google Developer Console.](https://console.developers.google.com/project)
12. Set the `APP_ENV` variable to `development` so that cookies are not marked secure.
13. Run the application with the command `npm run dev`, or for a more accurate representation of how the production app feels to use, run `npm run build:local` and then `npm run start`.
14. When you are done, to clean up, kill the dev server and then run `npm run supabase-dev:stop` and `npm run kv:stop`.

## Contributing

New engineers should review [CONTRIBUTING.md](https://github.com/8by8-org/8by8-challenge/blob/development/CONTRIBUTING.md) for details about the recommended workflow and tools.

Please also see the [Style Guide](https://github.com/8by8-org/8by8-challenge/blob/development/STYLE_GUIDE.md) for information about code style requirements. Reviewing this document is very important as it will save a lot of back-and-forth at PR review time.

## Resources

- [Figma prototype](https://www.figma.com/design/TP1ZMtd6ykIjNql1t0OBoA/8BY8_PROTO_V2)
- [Contributing](https://github.com/8by8-org/8by8-challenge/blob/development/CONTRIBUTING.md)
- [Style Guide](https://github.com/8by8-org/8by8-challenge/blob/development/STYLE_GUIDE.md)

## Tests and Tools

### Jest

Unit tests have been written with Jest and React Testing Library. To run these tests, run `npm run test`. You must first ensure that Docker is running and that you have run the commands `npm run supabase-test:start` (if you have the development Supabase project running already, you should first stop this with `npm run supabase-dev:stop`), and `npm run kv:start`.

### Storybook

Storybook stories have been written for most individual components. To view the stories, run `npm run storybook`.

### Selenium Tests

#### Prerequisites

- **Python**: Ensure Python is installed on your system.

  [Documentation](https://www.python.org/).

- **Selenium**: Python package for browser automation.

  [Documentation](https://selenium-python.readthedocs.io/installation.html#).

- **Pytest**: Python package for unit testing.

  [Documentation](https://docs.pytest.org/en/stable/getting-started.html).

- **Drivers**: Included with Selenium version 4.6.0 and higher.

  [Documentation](https://www.selenium.dev/documentation/selenium_manager/).

#### Setup Instructions

#### Python Version

While our project can run on different versions of Python, it is best practice to use Python 3 for better performance, security, and compatibility with modern libraries and frameworks.

#### Installing Python 3

If you do not have Python 3 installed, you can download it from the [official Python website](https://www.python.org/downloads/).
`python --version`

#### Note

The command to run Python might be `python3` on some systems (like Ubuntu and WSL), while in other environments it might just be `python`. Please adjust the commands accordingly based on your environment.

#### Systems using Python 3

- Ubuntu (including WSL)
- CentOS/RHEL (recent versions)
- Fedora
- macOS (often default)

#### Systems using Python (depends on configuration)

- Older Linux distributions (e.g., Ubuntu 12.04, CentOS 6)
- Conda Environments
- Docker Containers

#### 1. Create Virtual Enviornment

`python3 -m venv venv`

#### 2. Activate Virtual Enviornment

macOS
`source venv/bin/activate`

Windows
`venv\Scripts\activate`

Linux
`source venv/bin/activate`

#### 3. Installing Selenium

Selenium does not need to be installed on a per-project basis. To see if you already have it installed, you can run the following command:

```
pip show selenium
```

If installed, it will print information about the package. If the version is less than 4.6.0, you should update it by running:

```
pip install -U selenium
```

Otherwise, you can install it by running the following command:

```
pip install selenium
```

For more information on installing Selenium, see [this](https://www.selenium.dev/documentation/webdriver/getting_started/install_library/).

For information on upgrading Selenium, see [this](https://www.selenium.dev/documentation/webdriver/troubleshooting/upgrade_to_selenium_4/).

#### 4. Installing pytest

Be sure to install pytest:

```
pip install pytest
```

#### 5. Before Running Selenium Tests

To ensure that Selenium tests run efficiently, it is recommended to first compile your project using `npm run build:local` and then run the built application with `npm run start`. This step improves performance by compiling and optimizing the code, which can make the tests smoother.

I. **Build the Project:**

```
npm run build
```

II. **Start Development Server:**

```
npm run start
```

#### 7. Run the tests

To run the Selenium tests, navigate into `src/__tests__/e2e` and run

`python3 -m pytest`.
