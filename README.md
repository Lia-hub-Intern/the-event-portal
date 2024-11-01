#Svensk Version

Steg 1 : Installera Node.js, detta kan du göra på deras webbplats (https://nodejs.org/en). Kör filen och följ Package Manager instruktioner tills du är färdig.

Steg 2 : När du har installerat Node.js på din dator så behöver du också en api nyckel från hemsidan (https://console.groq.com/keys) då vi använder Llama3-70b-8192 (just nu). Där ska du skapa ett konto och sedan gå till "API Keys" för att skapa din egen, du kan nämna den till vad du vill. Denna nyckel vill du spara tills du använder den i .env filen på backend-mappen.

Steg 3 : Nu när du har gjort det ska du öppna VS Code och välj Clone Git Repository, klona sedan projektet från Lia-hub-intern/the-event-portal

Steg 4 : När du har klonat projektet så ska du installera olika paket för att allt ska fungera som det ska!

Uppe till vänster har du ett par verktyg du kan använda dig av, börja med att klicka på de tre punkterna du ser till höger, fortsätt till terminalen och skapa en ny terminal för projektet.

När du har skapat terminalen ser du att den är kopplad till projektets mapp, när vi vill installera paketen så måste vi lokalisera den korrekta mappen vi ska installera dom i, därför ska du börja med att skriva "cd backend" i terminalen för att komma dit vi vill.

Nu har du lokaliserat mappen och därför kan vi nu påbörja installationsprocessen

--- installationsprocess för backend ---

I terminalen skriver du "npm install" för att installera npm, och tänk på att du måste ha nodejs för att detta ska fungera.

Efteråt behöver du också skriva in "npm audit fix --force" för att fixa de problem som uppstod vid installation.

Därefter kör du dessa kommandon för att installera resten --->

"npm install cors" 
För ytliggare information finner du på (https://www.npmjs.com/package/cors)
"npm install dotenv" 
För ytliggare information finner du på (https://www.npmjs.com/package/dotenv)
"npm install express" 
För ytliggare information finner du på (https://www.npmjs.com/package/express)
"npm install groq-sdk" 
För ytliggare information finner du på (https://www.npmjs.com/package/groq-sdk)
"npm install nodemon" 
För ytliggare information finner du på (https://www.npmjs.com/package/nodemon)

<--- Paket <---

Grattis! nu har du installerat alla paket för backend och ska nu installera det du behöver för frontend, därför ska du nu skriva i din terminal "cd .." och sedan "cd frontend" för att lokalisera frontend'et.

Nu är det bara ett paket som du behöver installera och det är "npm install" och när du har gjort det behöver du också köra "npm audit fix --force" igen för att fixa problemen som kan ha följt med.

Nu är det viktigt att du går in i backend mappen och ersätter "GROQ_API_KEY = #Placeholder för din groqcloud api-nyckel" så att det blir "GROQ_API_KEY = din api nyckel" utan citattecken. kom ihåg att aldrig ladda upp på github med din nyckel på grund av säkerhetsrisker.

Nu kan du öppna en andra terminal på de tre punkter upp till höger och i den skriver du "cd backend". Då borde du ha två terminaler att kunna klicka mellan till höger om din terminal och för att testa så allt fungerar korrekt så ska du köra både frontend och backendet.

För att köra båda måste du köra kommandot "npm run dev" i båda terminalerna som du har, och grattis! Nu är du uppdaterad till senaste koden för projektet.

Om du har några frågor kan du ställa dom i våran discord server, och om du vill arbeta backend eller frontend måste du först informera scrum-masterna som just nu är "Sina", "Asia Rauf" och "darwinrr". Så att vi kan ha koll på vem som arbetar med vad, strukturera teamet och ge ut tasks på ett säkert sätt. Då detta är väldigt viktigt för arbetet att flyta på utan problem.

Sedan när du ska börja på och arbeta med projektet kommer du behöva skapa din egen bransch till projektet då det är väldigt viktigt att du inte laddar upp direkt till main och detta gör du nere till vänster på VS Code där du ser att det står main klickar du och sedan "Create new branch". Nu kommer du att få nämna din bransch till något eget som du kommer att få göra Pushningar och Pull Requests igenom. 

När du ser nere till vänster att du är på din bransch istället för main kommer du att kunna börja arbeta på koden och lycka till!

Viktigt information! (OBS!)
Innan du gör en Pull Request är det viktigt att tänka på dessa.

Har jag tagit bort all känslig data, som API-nycklar, tokens och lösenord, från koden?

Har jag granskat kod för vanliga säkerhetsproblem (t.ex. SQL-injektion, XSS eller CSRF-sårbarheter)

Har jag lagt till kommentarer och dokumentation för att förklara komplexa delar av koden?

Dokumenteras några beroenden från tredje part program, särskilt om de är avgörande för projektet?

Har jag kontrollerat att alla filer följer konsekventa namnkonventioner?

Är mappstrukturen logiskt organiserad för enkel navigering?

Finns komponenter, tillgångar och verktyg funktioner i sina respektive mappar?

Har jag tagit bort oanvänd kod, beroenden och tillgångar?

Har jag kört tester för att säkerställa att allt fungerar som förväntat?

Har jag skapat en förgreningsstrategi för att organisera kodändringar?

Har jag genomfört alla senaste ändringar och löst merge konflikter?

Sedan för att pusha upp din kod till din bransch måste du säkerställa att du är på din branch och sedan kör du dessa kommandon i terminalen "\the-event-portal> "

git add .
git commit -m "Describe your changes here"
git push origin your-branch-name

Detta går också att göra genom Source Control men det rekommenderar jag inte då mycket problem brukar uppstå som till exempel "du fastnar i laddningen". 

(Observera!)

Om din api nyckel inte fungerar kan jag rekommendera att använda dig av extensionen "CodeGPT" som du hittar till vänster i VS Code, där ser du en flik som heter "Extensions" där söker du CodeGPT och hittar tillägget "CodeGPT: Chat & AI Agents" där kan du sedan lägga in din groq api nyckel och koppla upp dig till den AI version som du behöver. Som vid detta tillfälle är "Llama3-70b-8192".

Vid frågor kan du ställa dom i våran Discord Server som heter "LIA".

Vi har också möten varje vardag 10:30 i "Meeting Room" och om du behöver en inbjudan till servern kan du fråga i Whatsapp gruppen, så får du svar så fort som möjligt!

Changelog :

2024-11-01 \Svartakatten : Uppdaterar hela main koden till nyaste versionen och skrivit ny Readme. Vid fråga kan ni höra av er till mig på Discord "airikrr" eller så ser ni mig igenom Discord Servern som Svartakatten.

#English version

Step 1 : Install Node.js, you can do this on their website (https://nodejs.org/en). Run the file and follow the Package Manager's instructions until you are done.

Step 2 : When you have installed Node.js on your computer, you also need an api key from the website (https://console.groq.com/keys) as we use Llama3-70b-8192 (right now). There you have to create an account and then go to "API Keys" to create your own, you can name it whatever you want. You want to save this key until you use it in the .env file in the backend folder.

Step 3 : Now that you've done that, open VS Code and select Clone Git Repository, then clone the project from Lia-hub-intern/the-event-portal

Step 4 : Once you have cloned the project, you must install various packages to make everything work as it should!

At the top left you have a couple of tools you can use, start by clicking on the three points you see on the right, continue to the terminal and create a new terminal for the project.

Once you have created the terminal you will see that it is linked to the project's folder, when we want to install the packages we need to locate the correct folder to install them in, therefore you should start by typing "cd backend" in the terminal to get there we want.

Now you have located the folder and therefore we can now start the installation process

--- backend setup process ---

In the terminal, type "npm install" to install npm, and note that you must have nodejs for this to work.

Afterwards, you also need to type "npm audit fix --force" to fix the problems encountered during installation.

Then run these commands to install the rest --->

"npm install cores"
For more superficial information you can find at (https://www.npmjs.com/package/cors)
"npm install dotenv"
For more superficial information you can find at (https://www.npmjs.com/package/dotenv)
"npm install express"
For more superficial information you can find at (https://www.npmjs.com/package/express)
"npm install groq-sdk"
For more superficial information you can find at (https://www.npmjs.com/package/groq-sdk)
"npm install nodemon"
For more superficial information you can find at (https://www.npmjs.com/package/nodemon)

<--- Package <---

Congratulations! Now you have installed all the packages for the backend and will now install what you need for the frontend, therefore you should now type in your terminal "cd .." and then "cd frontend" to locate the frontend.

Now there is only one package that you need to install and that is "npm install" and when you have done that you also need to run "npm audit fix --force" again to fix the problems that may have come with it.

Now it is important that you go into the backend folder and replace "GROQ_API_KEY = #Placeholder for your groqcloud api key" so that it becomes "GROQ_API_KEY = your api key" without quotes. remember to never upload to github with your key due to security risks.

Now you can open a second terminal at the three points up to the right and in it type "cd backend". Then you should have two terminals to be able to click between to the right of your terminal and to test that everything works correctly, you should run both the frontend and the backend.

To run both, you need to run the command "npm run dev" in both terminals that you have, and congratulations! now you are updated to the latest code for the project.

If you have any questions, you can ask them in our discord server, and if you want to work backend or frontend, you must first inform the scrum masters who are currently "Sina", "Asia Rauf" and "darwinrr". So that we can keep track of who works with what, structure the team and issue tasks in a safe way. As this is very important for the work to flow without problems.

Then when you start and work with the project you will need to create your own branch for the project as it is very important that you do not upload directly to main and you do this at the bottom left of VS Code where you see it says main click you and then "Create new branch". Now you will be able to name your branch as something of your own that you will be able to make Pushes and Pull Requests through.

When you see in the bottom left that you are on your branch instead of main you will be able to start working on the code and good luck!

Important information! (NOTE!)
Before you make a Pull Request, it is important to think about these.

Have I removed all sensitive data, such as API keys, tokens, and passwords, from the code?

Have I reviewed code for common security issues (eg SQL injection, XSS or CSRF vulnerabilities)

Have I added comments and documentation to explain complex parts of the code?

Are any dependencies from third-party programs documented, especially if they are critical to the project?

Have I checked that all files follow consistent naming conventions?

Is the folder structure logically organized for easy navigation?

Are components, assets, and tool functions in their respective folders?

Have I removed unused code, dependencies and assets?

Have I run tests to ensure everything works as expected?

Have I created a branching strategy to organize code changes?

Have I committed all recent changes and resolved merge conflicts?

Then to push your code to your branch you need to ensure you are on your branch and then run these commands in the terminal "\the-event-portal> "

git add .
git commit -m "Describe your changes here"
git push origin your-branch-name

This can also be done through Source Control, but I don't recommend it as a lot of problems usually arise such as "you get stuck in the loading".

(Note!)

If your api key does not work, I can recommend using the extension "CodeGPT" which you can find on the left in VS Code, there you will see a tab called "Extensions" there you search for CodeGPT and find the addon "CodeGPT: Chat & AI Agents " there you can then enter your groq-api-key and connect to the AI ​​version you need. Which on this occasion is "Llama3-70b-8192".

If you have questions, you can ask them in our Discord Server called "LIA".

We also have meetings every weekday at 10:30 in the "Meeting Room" and if you need an invitation to the server, you can ask in the Whatsapp group, and you will get an answer as soon as possible!

Changelog:

2024-11-01 \Svartakatten : Updates the entire main code to the newest version and wrote a new Readme. If you have any questions, you can contact me on Discord "airikrr" or you can see me through the Discord Server as Svartakatten.