import recommendation_model_np as RM
import numpy as np
import json
import sys


def z_score_normalization(array):
    return (array - array.mean()) / np.std(array)


jsonString = sys.stdin.readline()
jsonDict = json.loads(jsonString)

R = jsonDict['preference']
userNumber = jsonDict['userNumber']

R = np.array(R, dtype=np.float32)

model = RM.RecommendModel(R)
model.train()
predicted = model.predict(userNumber)
predicted = list(z_score_normalization(predicted))

result = {"predicted": predicted}
print(json.dumps(result))
