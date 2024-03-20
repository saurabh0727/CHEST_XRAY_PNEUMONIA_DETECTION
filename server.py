import base64
from io import BytesIO
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from PIL import Image
import io
import numpy as np
from tensorflow.keras.models import load_model
import tensorflow as tf
import json

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pydantic import BaseModel

class BaseRequest(BaseModel):
    image: str = "superman"

@app.post('/predict')
async def predict(base_request: BaseRequest):
    base64_string = base_request.image
    image_data = base64.b64decode(base64_string)
    img = Image.open(io.BytesIO(image_data))
    img = img.resize((224, 224))
    test_img = tf.keras.utils.img_to_array(img)
    test_img = np.expand_dims(test_img, axis=0)

    model = load_model("model.h5", compile=False)
    predictions = model.predict(test_img)
    result =  predictions.tolist()[0][0]

    if result ==0 :
        return "no"
    elif result ==1:
        return "yes"
    else:
        return "err"


if __name__ == '__main__':
    port=8000
    uvicorn.run(app,host="127.0.0.1",port=8000)