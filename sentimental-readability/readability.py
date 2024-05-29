from cs50 import get_string

# Text from Input
text = get_string("Text: ")

# Count number of letters
num_letters = 0
for c in text:
    if c.isalpha():
        num_letters += 1

# Count number of words
num_words = len(text.split())

# Count number of sentences
num_sentences = text.count(".") + text.count("!") + text.count("?")

# Average number of letters
L = num_letters / num_words * 100

# Average number of sentences
S = num_sentences / num_words * 100

# Calculate grade level
grade_level = 0.0588 * L - 0.296 * S - 15.8

if grade_level < 1:
    print("Before Grade 1")
elif grade_level >= 16:
    print("Grade 16+")
else:
    print(f"Grade {round(grade_level)}")
