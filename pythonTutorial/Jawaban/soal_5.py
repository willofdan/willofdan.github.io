# Fungsi hitung luas segitiga
def hitung_luas_segitiga(alas, tinggi):
    return 0.5 * alas * tinggi

# Input
alas = float(input("Masukkan alas segitiga (cm): "))
tinggi = float(input("Masukkan tinggi segitiga (cm): "))

# Output
luas = hitung_luas_segitiga(alas, tinggi)
print(f"Luas segitiga adalah {luas} cm².")
