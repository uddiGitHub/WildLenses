import cv2

def uploadImage(path):
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    return img

path = 'wild/Dataset/Amaranthus viridis L/20231025_105906.jpg'
res = uploadImage(path)
print(res)