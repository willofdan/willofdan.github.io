# Fungsi rekursif faktorial
def faktorial(n):
    if n == 0 or n == 1:  # Basis rekursi
        return 1
    else:
        return n * faktorial(n - 1)  # Rekursi

# Input
n = int(input("Masukkan angka untuk menghitung faktorial: "))

# Output
if n < 0:
    print("Faktorial tidak didefinisikan untuk bilangan negatif.")
else:
    print(f"Faktorial dari {n} adalah {faktorial(n)}.")
