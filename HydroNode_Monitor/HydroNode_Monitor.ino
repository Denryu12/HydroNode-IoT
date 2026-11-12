// Define Pins
const int trigPin = 9;
const int echoPin = 10;
const int greenLed = 4;
const int yellowLed = 5;
const int redLed = 6;
const int buzzer = 7;

// Variables for calculation
long duration;
int distance;
int waterPercentage;
const int tankDepth = 20; // Adjust to your demo container depth in cm

void setup() {
  Serial.begin(9600); 
  
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  pinMode(greenLed, OUTPUT);
  pinMode(yellowLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2; 
  
  waterPercentage = map(distance, tankDepth, 2, 0, 100);
  if (waterPercentage > 100) waterPercentage = 100;
  if (waterPercentage < 0) waterPercentage = 0;

  digitalWrite(greenLed, LOW);
  digitalWrite(yellowLed, LOW);
  digitalWrite(redLed, LOW);
  noTone(buzzer);

  if (waterPercentage > 50) {
    digitalWrite(greenLed, HIGH); 
  } else if (waterPercentage > 20) {
    digitalWrite(yellowLed, HIGH); 
  } else {
    digitalWrite(redLed, HIGH); 
    tone(buzzer, 1000); 
  }

  // Send JSON telemetry to Node.js
  Serial.print("{\"level\": ");
  Serial.print(waterPercentage);
  Serial.println("}");
  
  delay(2000); 
}
