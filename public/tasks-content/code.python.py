def encrypt(text):
	key = len(text)

	res = []
	for i in text:
		res.append(ord(i) + (ord(i) % key))
		key += 1
	return res
