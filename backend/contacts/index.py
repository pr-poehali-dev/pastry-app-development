"""Контакты: GET — данные из таблицы about, POST — сохранить сообщение в messages."""
import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if event.get('httpMethod') == 'POST':
        body = json.loads(event.get('body') or '{}')
        name = body.get('name', '').strip()
        phone = body.get('phone', '').strip()
        message = body.get('message', '').strip()

        if not name or not phone or not message:
            cur.close()
            conn.close()
            return {'statusCode': 400, 'headers': headers,
                    'body': json.dumps({'error': 'Заполните все поля'})}

        cur.execute(
            "INSERT INTO messages (name, phone, message) VALUES (%s, %s, %s) RETURNING id",
            (name, phone, message)
        )
        msg_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'ok': True, 'id': msg_id}),
        }

    # GET — контактные данные из about
    cur.execute("""
        SELECT address, phone, email, work_hours
        FROM about ORDER BY id DESC LIMIT 1
    """)
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({})}

    data = dict(zip(['address', 'phone', 'email', 'work_hours'], row))
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(data, ensure_ascii=False),
    }
