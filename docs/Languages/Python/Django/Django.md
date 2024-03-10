# Django

1. Install virtualenv.

   ```python
   pip install virtualenv
   ```

2. Create the virtual environment.

   ```bash
   virtualenv --no-site-packages name
   ```

3. Activate the virtual environment.

   ```bash
   source name_of_env_dir/bin/activate
   ```

4. Install Django if not install.

   ```bash
   pip install Django
   ```

5. Start your project.

   ```bash
   django-admin startproject project_name
   ```

6. Check if the prohject is created.

   ```bash
   python manage.py runserver
   ```

7. Open the link given in the browser: `http://localhost:8000` or `http://127.0.0.1:8000`
