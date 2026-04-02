"""Возвращает список товаров и категорий из базы данных для каталога кондитерской."""
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
        SELECT slug, label, sort_order
        FROM categories
        ORDER BY sort_order
    """)
    categories = [
        {'id': row[0], 'label': row[1]}
        for row in cur.fetchall()
    ]

    cur.execute("""
        SELECT id, name, category_slug, price, old_price,
               weight, description, image_url, badge, ingredients, allergens
        FROM products
        WHERE is_active = TRUE
        ORDER BY id
    """)
    cols = ['id', 'name', 'category', 'price', 'oldPrice',
            'weight', 'description', 'image', 'badge', 'ingredients', 'allergens']
    products = []
    for row in cur.fetchall():
        p = dict(zip(cols, row))
        if p['oldPrice'] is None:
            del p['oldPrice']
        if p['badge'] is None:
            del p['badge']
        products.append(p)

    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'categories': categories, 'products': products}, ensure_ascii=False),
    }
