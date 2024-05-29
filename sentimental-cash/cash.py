from cs50 import get_float

while True:
    change_owed = get_float("Change Owed: ")
    if change_owed >= 0:
        break

change_owed_cents = round(change_owed * 100)

num_coins = 0

while change_owed_cents > 0:
    if change_owed_cents >= 25:
        change_owed_cents -= 25
        num_coins += 1
    elif change_owed_cents >= 10:
        change_owed_cents -= 10
        num_coins += 1
    elif change_owed_cents >= 5:
        change_owed_cents -= 5
        num_coins += 1
    else:
        change_owed_cents -= 1
        num_coins += 1

print(num_coins)


