![image](https://github.com/sharcus/tf/assets/382375/0b6d70a5-0a40-4514-8f4f-e768e3172f3a)

Time Feeder is an small tool which allows you to plan and track your activity. It can be used as personal task tracker to track and analyze your activity.<br />

The project is created commonly in educational purposes as a pet project. Main goal is to learn how to use React Native in real project. Though you can use it as a real project on you iOS or Android device under Expo environment.<br />
<h1>Reference</h1>
<a href="#used-tools">Used Tools and Libraries</a><br />
<a href="#how-to-use">How to Use Time Feeder</a>
<ul>
  <li><a href="#step-1">Step 1. Define Your Activity</a></li>
  <li><a href="#step-2">Step 2. Create you monthly plan</a></li>
  <li><a href="#step-3">Step 3. Track you actvity</a></li>
  <li><a href="#step-4">Step 4. Analyze your activity</a></li>
</ul>


<h1 id="used-tools">Used Tools and Libraries</h1>
<ul>
  <li>React Native 0.73.2</li>
  <li>Expo 50.0.4</li>
  <li>Redux 4.2.0</li>
  <li>Reduxjs/toolkit 1.9.7</li>
  <li>Async Storage 1.21.0</li>
</ul>


<h1 id="how-to-use">How to Use Time Feeder</h1>
There are short description how to use the Time Feeder step by step.


<h3 id="step-1">Step 1. Define Your Activity</h3>
<ul>
  <li>In main screen click to <b>Activity</b> menu item to open Activity screen.</li>  
  <li>
    Then Click on <b>Add</b> button in the top header to create new activity item.<br/>
    <img src="https://github.com/sharcus/tf/assets/382375/49ce3fad-edeb-41cf-bf2d-725e0b04044b" />
  </li>
  <li>
    Name your activity and click <b>Apply</b> button.<br/>
    <img src="https://github.com/sharcus/tf/assets/382375/40878fe3-fea7-4d42-b181-f98af0e93035" />
  </li>
  <li>
    Make sure <b>Activity</b> is shown on the <b>Activities</b> screen. Here you can Edit activity name, change its status to Disabled or Remove Activity at all.<br/>
    <img src="https://github.com/sharcus/tf/assets/382375/18fa9c81-473d-4dc8-9cf7-96e420a9a05c" />
  </li>
</ul>


<h3 id="step-2">Step 2. Create you monthly plan</h3>
Time Feeder allows you to schedule your activity per month. This can be achieved in Plan screen.
<ul>
  <li>
    Click to <b>Plan</b> menu item to open Plan screen.<br/>
    <img src="https://github.com/sharcus/tf/assets/382375/a529fa82-643f-405e-bde9-27bf5c5496d1" />
  </li>
  <li>
    If you don't have monthly plan yet, Click on <b>New Period</b> button to create new monthly plan.
  </li>
  <li>
    In monthly plan view select or unselect days which will be applicable for you activities by clicking on calendar day item. Blue cell means that day is selected for activity, white cell - no selection. By default the days from Monday to Friday are selected. It means that Time Feeder expects that in these days you will track your activities. 
    Also you can define expected duration per day for you activities and total hour for the month.
    After you define all days for tracking activities you can click on <b>Go To Workload</b> to distribute your time between available activities.<br/>
    <img src="https://github.com/sharcus/tf/assets/382375/c0bf071a-fa28-4fc2-b13d-c47c09a963b4" />
  </li>
  <li>
    On <b>Monthly workload</b> screen you can distribute your scheduled monthly time between all your activities.<br />
    <img src="https://github.com/sharcus/tf/assets/382375/28aac5a4-e350-479c-a650-a5544580a579" />
  </li>
</ul>


<h3 id="step-3">Step 3. Track you actvity</h3>
Now your activities and monthly plan is scheduled, so you can track activities on main page.
<ul>
  <li>
    Go to <b>Home</b> screen and click <b>Add New Log</b> button.<br />
      <img src="https://github.com/sharcus/tf/assets/382375/d15f4a09-9598-4688-9c1d-fe38a039f35f" />
  </li>
  <li>
    In <b>Log Details</b> screen provide information about your activity type, time of activity and some details, as shown below. After all details is provided, click <b>Accept</b>.<br />
    <img src="https://github.com/sharcus/tf/assets/382375/b10646f6-7760-4d0c-82c0-1fe0a0934c67" />
  </li>
  <li>
    Ensure, you activity is shown on the screen.<br />
    <img src="https://github.com/sharcus/tf/assets/382375/71b72573-6cbd-447a-b5a5-79cd2f173d30" />
  </li>
  <li>In main screen you can switch between <b>Day</b> view, <b>Week</b> view and <b>Month</b> depending on your preferences. To do this you can click on Tab label in the bottom of the screen.<br/>
    <img src="https://github.com/sharcus/tf/assets/382375/3dcd06d9-6426-42e9-ac45-2f626ca881b5" />
  </li>
  <li>
    Additionally you can change date in the top to navigate to next or previous period.    
  </li>    
  <li>
    You can click <b>Show More</b> button for navigating to detailed log screen. On this screen you can change details for your log items or remove them.<br />
    <img scr="https://github.com/sharcus/tf/assets/382375/7a7a274a-637f-47b3-a6ee-c84abeeb1a2b" />
  </li>
</ul>


<h3 id="step-3">Step 4. Analyze your activity</h3>
Time Feeder allow you analyze you activity. <b>Staticstics</b> screen contains a chart which show you activity progress for the selected month

