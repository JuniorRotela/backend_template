# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import cv2
# import numpy as np
# import base64
# import os

# app = Flask(__name__)
# CORS(app)

# # Directorio donde se guardarán las imágenes procesadas
# SAVE_DIR = 'SAVE_DIR'  # Cambia esto a tu ruta deseada
# # Asegúrate de que el directorio existe
# os.makedirs(SAVE_DIR, exist_ok=True)

# @app.route('/imagen', methods=['POST'])
# def process_image():
#     data = request.get_json()
#     image_data = data.get('image')

#     try:
#         # Eliminar el prefijo de base64 si está presente
#         if image_data.startswith('data:image/jpeg;base64,'):
#             image_data = image_data.split(',')[1]
        
#         # Convertir de base64 a imagen
#         image_bytes = base64.b64decode(image_data)
#         nparr = np.frombuffer(image_bytes, np.uint8)
#         image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#         # Lógica para detectar áreas reutilizables
#         processed_image, reusable_areas = detect_reusable_areas(image)
        
#         # Convertir la imagen procesada de nuevo a Base64
#         _, buffer = cv2.imencode('.jpg', processed_image)
#         processed_image_base64 = base64.b64encode(buffer).decode('utf-8')

#         # Retornar la imagen procesada en Base64 y las áreas reutilizables
#         return jsonify({"reusable_areas": reusable_areas, "processed_image": processed_image_base64}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# def detect_reusable_areas(image):
#     # Convertir la imagen a HSV
#     hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
#     # Definir el rango de color verde en HSV
#     lower_green = np.array([40, 40, 40])
#     upper_green = np.array([80, 255, 255])
    
#     # Crear una máscara para los píxeles verdes
#     mask = cv2.inRange(hsv, lower_green, upper_green)
    
#     # Encontrar contornos de las áreas defectuosas (verdes)
#     contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
#     # Dibujar los contornos de las áreas defectuosas en rojo
#     for contour in contours:
#         cv2.drawContours(image, [contour], -1, (0, 0, 255), 2)
    
#     # Crear una máscara para las áreas defectuosas en rojo
#     mask_defects = np.zeros_like(image[:, :, 0])
#     for contour in contours:
#         cv2.drawContours(mask_defects, [contour], -1, 255, -1)
    
#     # Invertir la máscara
#     mask_inv = cv2.bitwise_not(mask_defects)
    
#     # Encontrar contornos de las áreas sanas (no rojas)
#     contours, _ = cv2.findContours(mask_inv, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
#     reusable_areas = []

#     # Dibujar los contornos de las áreas sanas detectadas en azul sin tocar los bordes rojos
#     padding = 10  # Ajusta este valor si es necesario
#     for contour in contours:
#         area = cv2.contourArea(contour)
#         if area > 500:  # Filtrar áreas pequeñas (evitar recortes inútiles)
#             x, y, w, h = cv2.boundingRect(contour)
#             reusable_areas.append({"x": x + padding, "y": y + padding, "width": w - padding * 2, "height": h - padding * 2})
#             cv2.rectangle(image, (x + padding, y + padding), (x + w - padding, y + h - padding), (255, 0, 0), 2)
#             cv2.putText(image, 'Corte', (x + padding, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

#     return image, reusable_areas

# if __name__ == '__main__':
#     app.run(debug=True)





# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import cv2
# import numpy as np
# import base64
# import os

# app = Flask(__name__)
# CORS(app)

# # Directorio donde se guardarán las imágenes procesadas
# SAVE_DIR = 'SAVE_DIR'  # Cambia esto a tu ruta deseada
# # Asegúrate de que el directorio existe
# os.makedirs(SAVE_DIR, exist_ok=True)

# @app.route('/imagen', methods=['POST'])
# def process_image():
#     data = request.get_json()
#     image_data = data.get('image')
    
#     try:
#         # Eliminar el prefijo de base64 si está presente
#         if image_data.startswith('data:image/jpeg;base64,'):
#             image_data = image_data.split(',')[1]
        
#         # Convertir de base64 a imagen
#         image_bytes = base64.b64decode(image_data)
#         nparr = np.frombuffer(image_bytes, np.uint8)
#         image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#         # Lógica para detectar áreas reutilizables
#         processed_image, reusable_areas = detect_reusable_areas(image)
        
#         # Convertir la imagen procesada de nuevo a Base64
#         _, buffer = cv2.imencode('.jpg', processed_image)
#         processed_image_base64 = base64.b64encode(buffer).decode('utf-8')

#         # Retornar la imagen procesada en Base64 y las áreas reutilizables
#         return jsonify({"reusable_areas": reusable_areas, "processed_image": processed_image_base64}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# def detect_reusable_areas(image):
#     # Convertir la imagen a HSV
#     hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
#     # Definir el rango de color verde en HSV
#     lower_green = np.array([40, 40, 40])
#     upper_green = np.array([80, 255, 255])
    
#     # Crear una máscara para los píxeles verdes
#     mask = cv2.inRange(hsv, lower_green, upper_green)
    
#     # Encontrar contornos de las áreas defectuosas (verdes)
#     contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
#     # Dibujar los contornos de las áreas defectuosas en rojo
#     for contour in contours:
#         cv2.drawContours(image, [contour], -1, (0, 0, 255), 2)
    
#     # Crear una máscara para las áreas defectuosas en rojo
#     mask_defects = np.zeros_like(image[:, :, 0])
#     for contour in contours:
#         cv2.drawContours(mask_defects, [contour], -1, 255, -1)
    
#     # Invertir la máscara
#     mask_inv = cv2.bitwise_not(mask_defects)
    
#     # Encontrar contornos de las áreas sanas (no rojas)
#     contours, _ = cv2.findContours(mask_inv, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
#     reusable_areas = []

#     # Dibujar los contornos de las áreas sanas detectadas en azul sin tocar los bordes rojos
#     for contour in contours:
#         area = cv2.contourArea(contour)
#         if area > 500:  # Filtrar áreas pequeñas (evitar recortes inútiles)
#             x, y, w, h = cv2.boundingRect(contour)
#             reusable_areas.append({"x": x, "y": y, "width": w, "height": h})
    
#     # Dibujar rectángulos azules de corte en toda la imagen excepto en el área del borde rojo
#     height, width, _ = image.shape
#     rect_size = 100  # Puedes ajustar este tamaño según sea necesario
#     for y in range(0, height, rect_size):
#         for x in range(0, width, rect_size):
#             if np.all(mask_defects[y:y+rect_size, x:x+rect_size] == 0):  # Si no hay defectos en esta área
#                 cv2.rectangle(image, (x, y), (x + rect_size, y + rect_size), (255, 0, 0), 2)
#                 cv2.putText(image, 'Corte', (x + 5, y + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 1)

#     return image, reusable_areas

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import os

app = Flask(__name__)
CORS(app)

# Directorio donde se guardarán las imágenes procesadas
SAVE_DIR = 'SAVE_DIR'  # Cambia esto a tu ruta deseada
os.makedirs(SAVE_DIR, exist_ok=True)

@app.route('/imagen', methods=['POST'])
def process_image():
    data = request.get_json()
    image_data = data.get('image')
    
    try:
        # Eliminar el prefijo de base64 si está presente
        if image_data.startswith('data:image/jpeg;base64,'):
            image_data = image_data.split(',')[1]
        
        # Convertir de base64 a imagen
        image_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Lógica para detectar áreas reutilizables
        processed_image, reusable_areas = detect_reusable_areas(image)
        
        # Convertir la imagen procesada de nuevo a Base64
        _, buffer = cv2.imencode('.jpg', processed_image)
        processed_image_base64 = base64.b64encode(buffer).decode('utf-8')

        # Retornar la imagen procesada en Base64 y las áreas reutilizables
        return jsonify({"reusable_areas": reusable_areas, "processed_image": processed_image_base64}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def detect_reusable_areas(image):
    # Convertir la imagen a HSV para detectar el color verde (áreas defectuosas)
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    # Definir el rango de color verde en HSV
    lower_green = np.array([40, 40, 40])
    upper_green = np.array([80, 255, 255])
    
    # Crear una máscara para los píxeles verdes
    mask = cv2.inRange(hsv, lower_green, upper_green)
    
    # Encontrar contornos de las áreas defectuosas (verdes)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Dibujar los contornos de las áreas defectuosas en rojo
    for contour in contours:
        cv2.drawContours(image, [contour], -1, (0, 0, 255), 2)
    
    # Crear una máscara para las áreas defectuosas en rojo
    mask_defects = np.zeros_like(image[:, :, 0])
    for contour in contours:
        cv2.drawContours(mask_defects, [contour], -1, 255, -1)
    
    # Crear una versión invertida de la máscara para las áreas sanas
    mask_inv = cv2.bitwise_not(mask_defects)
    
    height, width, _ = image.shape
    used = np.zeros((height, width), dtype=bool)  # Matriz para marcar las áreas usadas
    
    # Variable para almacenar los cortes reutilizables
    reusable_areas = []
    
    # Llenar la imagen con rectángulos lo más grandes posibles
    for y in range(0, height, 10):
        for x in range(0, width, 10):
            w, h = 1200, 800  # Comenzar con un cuadrado de 10x10 y expandirlo
            
            while w < width and h < height:
                # Verificar si el área propuesta no toca bordes rojos y no ha sido usada
                if np.all(mask_defects[y:y+h, x:x+w] == 0) and not np.any(used[y:y+h, x:x+w]):
                    # Dibujar el rectángulo en azul
                    cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 2)
                    reusable_areas.append({"x": x, "y": y, "width": w, "height": h})
                    # Marcar el área como usada
                    used[y:y+h, x:x+w] = True
                else:
                    break  # Si encuentra un borde rojo o área usada, no expandir más
                w += 10
                h += 10  # Expandir el área paso a paso

    return image, reusable_areas

if __name__ == '__main__':
    app.run(debug=True)