from PIL import Image, ImageDraw

img = Image.open('task-png.png')
width, height = img.size
listOfBytes = list()

for y in range(height):
    byte = ''
    for x in range(width):
        byte += '0' if img.getpixel((x, y)) == (0, 0, 0) else '1'
    listOfBytes.append(chr(int(byte, 2)))

print(''.join(listOfBytes))