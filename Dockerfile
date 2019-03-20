FROM python:3.7.2-alpine
ADD . /code
WORKDIR /code

CMD ["python", "app.py"]