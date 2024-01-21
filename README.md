<h1>Discounty</h1>
<p>Welcome to the Discounty app, a proximity based discount searcher.</p>
<h2>Introduction</h2>
<p>Discounty is a mobile application designed to provide users with a convenient way to find
the best deals and promotions offered by stores in their vicinity. Whether you're a shopper looking to save
money, or a store owner showcasing your latest discounts - Discounty is for you.</p>

<h3>Key Features</h3>
<ol><li>Location-Based Discounts: Discover discounts from stores near your current location,
making it easy to find great deals in your neighbourhood.</li>
<li>Real-Time Updates: Get real-time updates on latest discounts.</li>
<li>Store Details: Access detailed information about each store, including pictures and additional details about
the discounts they offer.</li>
</ol>

<h3>How it works</h3>
<ol><li>
  Location Access: Upon launching the app, Discounty requests permission to access your location. This ensures that the app
  can provide you with discounts from stores in your proximity.
</li>
<li>
  Explore Discounts: Browse through a list of discounts offered by nearby stores. The app uses distance-calculating formulas
  to present you with the closest Discounty registered stores.
</li>
<li>
  Store Details: Tap on a store to view more details about their discounts, location, and additional information.
</li></ol>

<h3>For Store Owners</h3>
<p>If you're a store owner, Discounty provides a platform to showcase your promotions to a broader audience. Increase foot
traffic and attract new customers by featuring your discounts on the app.</p>

<h2>Setting Up Django Backend for Discounty App</h2>
<h3>Prerequisites</h3>
<p>Before setting up the Django backend, make sure you have the following prerequisites installed on your development machine:</p>
<ul><li>Python: Install Python on your machine. You can download it from <a href="python.org">python.org</a>.</li></ul>



<h2>Setting Up React Frontend for Discounty App</h2>
<h3>Prerequisites</h3>
<p>Before setting up the Discounty app, ensure that you have the following prerequisites installed on your development machine:
</p>
<ul><li>Node.js and npm: Make sure you have Node.js installed, as npm is required for making project dependencies.</li>
<li>Expo CLI: Install the Expo CLI globally using the following command: <br>
<code>npm install -g expo-cli</code></li>
<li>Expo Go: Download the Expo Go app on your mobile device. This app allows you to run your React Native applications
on a physical device for testing.</li></ul>

<h3>Clone the Repository</h3>
<p>Clone the Discounty repository to your local machine using the following command:</p>
<code>git clone https://github.com/AunderscoreYoussef/Discounty</code>

<h3>Navigate to the Project Directory</h3>
<p>Move into the project directory:</p>
<code>cd discounty</code>

<h3>Install Dependencies</h3>
<p>Install the project dependencies using npm:</p>
<code>npm install</code>

<h3>Configure API Endpoint</h3>
<p>Open the project in your preferred code editor and navigate to the <code>LocationScreen.js</code> and <code>StoreDetailsScreen.js</code> files.
Locate the following line:</p>
<code>const response = await axios.get('http://[YOUR DJANGO IP]:[YOUR DJANGO PORT]')</code>
<p>Replace the URL with the endpoint of your Django API where store information is served. Make sure your API is running and accessible. For development's sake, it is recommended to input custom IP and port through Django's <code>runserver</code> command. <a href="#example">Example.</a></p>

<h3>Run the App</h3>
<code>expo start</code>
<p>Scan the QR code using the Expo Go app on your mobile device or run the app on an emulator.</p>

<h3>Explore Discounty</h3>
<p>Once the app is running, you can explore the Discounty app on your mobile device. Discover nearby stores, view their discounts, and experience the app's functionality.</p>
