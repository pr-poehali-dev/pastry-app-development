"""Возвращает информацию о кондитерской со страницы 'О нас'."""
import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute("""
        SELECT founded_year, tagline,
               description_1, description_2, description_3,
               clients_count, masters_count, rating, years_label,
               address, phone, email, work_hours, image_url
        FROM about
        ORDER BY id DESC
        LIMIT 1
    """)
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return {'statusCode': 404, 'headers': headers, 'body': json.dumps({'error': 'not found'})}

    keys = [
        'founded_year', 'tagline',
        'description_1', 'description_2', 'description_3',
        'clients_count', 'masters_count', 'rating', 'years_label',
        'address', 'phone', 'email', 'work_hours', 'image_url',
    ]
    data = dict(zip(keys, row))

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(data, ensure_ascii=False),
    }
