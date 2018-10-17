from PIL import Image, ImageDraw
text = list(
    map(
        lambda item: 
            str(bin(ord(item)))[2:], 
        list('Some_code_and_this_will_be_solved')
    )
)

# 70x330
# 7x33 (blocks)
# => size of block = 10x10
img = Image.new('RGB', (7, 33), (255, 255, 255))

y = 0
for byte in text:
    x = 0
    for bit in byte:
        img.putpixel((x, y), (0, 0, 0) if bit == '0' else (255, 255, 255) )    
        x += 1
    y += 1
    print(byte)

img.save('task-png.png')