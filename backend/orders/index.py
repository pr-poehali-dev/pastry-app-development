"""Оформление заказа: сохраняет заказ и позиции в БД, возвращает номер заказа."""
import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')

    client_name = body.get('client_name', '').strip()
    client_phone = body.get('client_phone', '').strip()
    client_email = body.get('client_email', '').strip()
    address = body.get('address', '').strip()
    delivery_type = body.get('delivery_type', 'courier')
    delivery_cost = int(body.get('delivery_cost', 0))
    subtotal = int(body.get('subtotal', 0))
    total = int(body.get('total', 0))
    bonus_spent = int(body.get('bonus_spent', 0))
    bonus_earned = int(body.get('bonus_earned', 0))
    comment = body.get('comment', '').strip()
    items = body.get('items', [])

    if not client_name or not client_phone or not items:
        return {'statusCode': 400, 'headers': headers,
                'body': json.dumps({'error': 'Заполните обязательные поля'})}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO orders
            (client_name, client_phone, client_email, address,
             delivery_type, delivery_cost, subtotal, total,
             bonus_earned, bonus_spent, comment)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (client_name, client_phone, client_email, address,
          delivery_type, delivery_cost, subtotal, total,
          bonus_earned, bonus_spent, comment))
    order_id = cur.fetchone()[0]

    for item in items:
        cur.execute("""
            INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
            VALUES (%s, %s, %s, %s, %s)
        """, (order_id, item.get('product_id'), item.get('product_name'),
              int(item.get('price', 0)), int(item.get('quantity', 1))))

    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'ok': True, 'order_id': order_id,
                            'order_number': f'#{10000 + order_id}'}),
    }
