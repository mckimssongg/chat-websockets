# Install the backend

We will need to have python 3.10 and redis installed

```shell
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

# Install the frontend

We will need to have node 18 and yarn or pnpm installed

```shell
node --vesion
>>> node 18.0
npm install -g yarn 
# or
npm install -g pnpm 
cd app
yarn install
#or
pnpm install
# and 
yarn run dev 
# or 
pnpm run dev
```

# Install the backend

```shell
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```


### Traditional request / response model

![Traditional](https://heroku-blog-files.s3.amazonaws.com/posts/1473343845-django-asgi-websockets.png)

### Worker model by Channel

![Channels](https://heroku-blog-files.s3.amazonaws.com/posts/1473343845-django-wsgi.png)
