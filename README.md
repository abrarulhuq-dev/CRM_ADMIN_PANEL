# CRM admin panel 

[!Frontend](https://crm-admin-panel-eight.vercel.app/)
[!Backend](https://crm-admin-panel-yyzy.onrender.com)


---

## TECH STACK

- **FRONTEND: ** React, TailwindCSS, Axios, react-hot-toast
- **BACKEND: ** Django, Django REST Framework, JWT Authentication, SQLite3

## Project Structure
root/
├─ backend/ # Django backend
│ ├─ App/
| |   |─ App
| |   |─ customer # for customers Modular
| |   |─ department # department Modular
| |   |─ manager # manager Modular
| |   |─ staff # staff Modular
| |   |─ user # Admin modular
│ ├─ piplock
│ ├─pipfile 
│ └
├─ frontend/ # React frontend
│ ├─ src/
| |   |─assets
| |   |─component
| |   |─context
| |   |─pages
| |   |-App.jsx
| |   |─ main.jsx
│ ├─ package.json
│ └─ vite.config.js
└─ README.md
 |--


# SETUP STEP

``` 
1 Clone  repo
 git clone
 cd CRM_ADMIN_PANEL

2 Backend setup
 cd Backend

 python -m pipenv shell

 pip install -r requirements.txt

 python manage.py migrate

 python manage.py createsuperuser
 # admincredentials
 # Username: admin
 # Email: admin@example.com
 # Password: Admin@crm

 python manage.py runserver

3 Frondend setup

cd frontend
npm install
npm run dev


API Doc

https://crm-admin-panel-yyzy.onrender.com/api/
    
    customer/  # customer api to GET, POST, PATCH
    department/ # department api to GET, POST 
    manager/    #maanager api to GEt, POST, PATCH
    staff/ #staff staff api to GET, POST, PATCH
    user/register, #admin registeration
    user/login, #admin login



