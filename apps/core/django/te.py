import requests

# Define the API endpoint and headers
url = "http://127.0.0.1:8000/users/"
headers = {
    "Content-Type": "application/json"
}

posts = [
    {
        "username": "ken_wafula",
        "first_name": "Ken",
        "last_name": "Wafula",
        "email": "ken.wafula@example.com",
        "role": "admin",
        "bio": "Experienced entrepreneur and business leader in Nairobi, passionate about technology and innovation.",
        "receive_newsletter": True,
        "password": 1234
    },
    {
        "username": "jane_kamau",
        "first_name": "Jane",
        "last_name": "Kamau",
        "email": "jane.kamau@example.com",
        "role": "author",
        "bio": "Tech journalist covering the latest trends in mobile technology and fintech innovations in Kenya.",
        "receive_newsletter": True,
        "password": 1234
    },
    {
        "username": "mike_kimani",
        "first_name": "Mike",
        "last_name": "Kimani",
        "email": "mike.kimani@example.com",
        "role": "subscriber",
        "bio": "Startup enthusiast interested in blockchain technology and its applications in Nairobi's tech scene.",
        "receive_newsletter": False,
        "password": 1234
    },
    {
        "username": "sarah_muthoni",
        "first_name": "Sarah",
        "last_name": "Muthoni",
        "email": "sarah.muthoni@example.com",
        "role": "admin",
        "bio": "Digital marketer focusing on AI-driven marketing strategies for businesses in Kenya.",
        "receive_newsletter": True,
        "password": 1234
    },
    {
        "username": "peter_kiplagat",
        "first_name": "Peter",
        "last_name": "Kiplagat",
        "email": "peter.kiplagat@example.com",
        "role": "author",
        "bio": "Software developer passionate about open-source projects and building tech solutions for Kenyan startups.",
        "receive_newsletter": True,
        "password": 1234
    },
    {
        "username": "lucy_njeri",
        "first_name": "Lucy",
        "last_name": "Njeri",
        "email": "lucy.njeri@example.com",
        "role": "subscriber",
        "bio": "Educator exploring e-learning platforms and digital literacy initiatives in Kenyan schools.",
        "receive_newsletter": False,
        "password": 1234
    },
    {
        "username": "david_mwangi",
        "first_name": "David",
        "last_name": "Mwangi",
        "email": "david.mwangi@example.com",
        "role": "author",
        "bio": "Tech entrepreneur specializing in mobile app development and digital payments solutions.",
        "receive_newsletter": True,
        "password": 1234
    },
    {
        "username": "mary_adhiambo",
        "first_name": "Mary",
        "last_name": "Adhiambo",
        "email": "mary.adhiambo@example.com",
        "role": "subscriber",
        "bio": "Data analyst interested in leveraging data science to address healthcare challenges in Kenya.",
        "receive_newsletter": False,
        "password": 1234
    },
    {
        "username": "paul_mutua",
        "first_name": "Paul",
        "last_name": "Mutua",
        "email": "paul.mutua@example.com",
        "role": "admin",
        "bio": "IT consultant with expertise in cybersecurity strategies for Kenyan financial institutions.",
        "receive_newsletter": True,
        "password": 1234
    },
    {
        "username": "grace_wambui",
        "first_name": "Grace",
        "last_name": "Wambui",
        "email": "grace.wambui@example.com",
        "role": "subscriber",
        "bio": "Tech enthusiast exploring IoT applications in agriculture and environmental sustainability in Kenya.",
        "receive_newsletter": False,
        "password": 1234
    }
]


# Send POST requests to create tags
for tag in posts:
    response = requests.post(url, headers=headers, json=tag)
    if response.status_code == 201:
        print(f"Successfully created tag: {tag['username']}")
    else:
        print(f"Failed to create tag: {tag['username']}, Status Code: {response.status_code}, Response: {response.text}")
