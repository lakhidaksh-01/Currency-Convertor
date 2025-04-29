
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      ExchangeRate();  
    }
  });
  
          const dropdowns = document.querySelectorAll(".dropdown select");
          for (let select of dropdowns) {
              for (currCode in countryList) {
                  let newOption = document.createElement("option");
                  newOption.innerText = currCode;
                  newOption.value = currCode;
  
                  if (select.name === "from" && currCode === "USD") {
                      newOption.selected = "selected";
                  } else if (select.name === "to" && currCode === "INR") {
                      newOption.selected = "selected";
                  }
                  select.append(newOption);
                  select.addEventListener("change", function (event) {
                      updateFlag(event.target);
                  });
              }
          }
  
          function updateFlag(event) {
              let currCode = event.value;
              let countryCode = countryList[currCode];
              let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
              let img = event.parentElement.querySelector('img');
              img.src = newsrc;
          }
  
          async function ExchangeRate() {
              const amount = parseFloat(document.querySelector("#amt").value) || 1;
              const fromCountry = document.querySelector('select[name="from"]').value;
              const toCountry = document.querySelector('select[name="to"]').value;
  
              const url = `https://v6.exchangerate-api.com/v6/1db59ed6ab516d10f6075e7a/latest/${fromCountry}`;
              try {
                  const response = await fetch(url);
                  const data = await response.json();
  
                  if (data.result === "success") {
                      const rate = data.conversion_rates[toCountry];
                      const totalamt = (rate * amount).toFixed(2);
                      document.querySelector(".msg p").textContent = `${amount} ${fromCountry} = ${totalamt} ${toCountry}`;
                  } else {
                      document.querySelector(".msg p").textContent = "Error fetching exchange rate. Try reloading the page.";
                  }
              } catch (error) {
                  document.querySelector(".msg p").textContent = "Error connecting to the exchange rate API.";
              }
          }
  
          ExchangeRate();
  
  
  
  
          function swapCurrencies() {
              const fromCurrency = document.querySelector('select[name="from"]');
              const toCurrency = document.querySelector('select[name="to"]');
  
              // Swap selected values
              const tempValue = fromCurrency.value;
              fromCurrency.value = toCurrency.value;
              toCurrency.value = tempValue;
  
          const fromFlag = document.querySelector('.from img');
      const toFlag = document.querySelector('.to img');
  
      // Swap the flags directly by swapping their src attributes
      const tempSrc = fromFlag.src;
      fromFlag.src = toFlag.src;
      toFlag.src = tempSrc;
  
              // Get updated exchange rate
              ExchangeRate();
          }