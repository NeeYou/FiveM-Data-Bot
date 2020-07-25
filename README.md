# FiveM | Server Status Bot

[PL]
Instalacja

Wymagania:
  NodeJS

Linux
  1. Stwórz folder i wypakuj pliki bota.
  2. Uzupełnij token bota w pliku config.json.
  3. Zainstaluj wymagane pakiety.
  
    npm install
    
  4. Uruchom bota.
  
    node index.js  
    
  5. Wyślij wiadomość "/send-message" na kanale którym chcesz mieć wysyłaną wiadomość przez bot'a, po czym wyłącz bota.
  6. Uzupełnij "fivem_info_url" (3 linia) i "fivem_players_url" (4 linia) w pliku config.json.
  
    http://ip:port/info.json - fivem_info_url
    http://ip:port/info.json - fivem_players_url 
    
  7. Ustaw "channel_status_id" (Kanał na którym mają być wysyłane wiadomości) oraz "message_status_id" (Id wiadomości którą wysłał bot).
  8. Uruchom bota.
  
    node index.js    
  [ENG]
  
 Installation
 
 Requirements:
  NodeJS

Linux
  1. Create a folder and extract the bot files.
  2. Complete the bot token in the file config.json.
  3. Install the required packages.
  
    npm install
    
  4. Run bot
  
    node index.js
    
  5. Send command "/send-message" and stop the bot. 
  6. Replace the "fivem_info_url" (3 line) and "fivem_players_url" (4 line) in the file config.json.
  
    http://ip:port/info.json - fivem_info_url
    http://ip:port/info.json - fivem_players_url 
    
  7. Set channel id (where is the status message) and copy message id and paste in config.
  8. Run the bot.
    
    node index.js
