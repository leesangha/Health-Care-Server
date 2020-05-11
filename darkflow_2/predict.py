from darkflow.net.build import TFNet
import cv2
import json
import sys
import numpy as np
from pathlib import Path


def json_default(value):
    if isinstance(value, np.float32):
        return float(value)


userNumber = sys.stdin.readline().rstrip()
date = sys.stdin.readline().rstrip()
img = sys.stdin.readline().rstrip()

file_path = Path(__file__).parent
cfg_path = file_path / 'cfg' / 'tiny-yolo-voc-3c.cfg'
label_path = file_path / 'labels.txt'

options = {
    "model": str(cfg_path),
    "load": 38735,
    "threshold": 0.2,
    "labels": str(label_path),
    "backup": str(file_path / 'ckpt')
}

upload_dir = file_path.parent / 'uploads'
img_path = upload_dir / userNumber / date / img

tfnet = TFNet(options)
imgcv = cv2.imread(str(img_path))
results = tfnet.return_predict(imgcv)

for result in results:
    print(json.dumps(result, default=json_default))

# 사진 추가 -> db 저장 -> python 코드로 판별 -> 음식 결과 정보 반환
#       -> 데이터를 db에서 읽도록 변환 -> 음식정보 읽어오기
