prices = open("prices.txt", "a")

prices.write("\"dollars\": [\n")

# prints all numbers divisible by 1000 between 0 and 5000
for num in range(50001):

    # if last number to print, add new line, instead of comma
    if num == 50000:
        prices.write("\t\"" + str(num) + "\"\n")
    else:
        if num < 300:
            # prints numbers less than 300 five times per line
            for i in range(6):

                # if first number to print, add tab (for formatting)
                if i == 0:
                    prices.write("\t\"" + str(num) + "\",")

                # if last number to print, add new line
                elif i == 5:
                    prices.write("\"" + str(num) + "\",\n")
                else:
                    prices.write("\"" + str(num) + "\",")

        elif num % 1000 == 0:
            prices.write("\t\"" + str(num) + "\",\n")

prices.write("]")
prices.close()

cents = open("cents.txt", "a")

cents.write("\"cents\": [\n")

# prints all numbers between 0 and 99, in two digit format
for num in range(100):

    # if last number to print, add new line instead of comma
    if num == 99:
        cents.write("\t\"" + "%02d" % num + "\"\n")
    else:
        cents.write("\t\"" + "%02d" % num + "\",\n")

cents.write("]")
cents.close()