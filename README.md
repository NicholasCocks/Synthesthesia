# Draw-Me-Oscillascope
Welcome to the Draw-Me-Oscillascope wiki!

## Background!
An oscilloscope's is an instrument who's primary function is to provide a graph of the fourier transform of sound waves by letting users draw shapes that correspond to pitches and volumes.

## Functionality & MVP
With Draw-Me-Oscillascope, users will be able to:

Free-draw onto a board (graph). The x-axis corresponding to the left audio channel's volume/frequency and the y-axis corresponding to the right channel's volume/frequency.
A frequency analyzer to show the waveform they're drawing.
A visual display of the numbers going into the fourier transform.


In addition this project will include:
A brief introduction to the Fourier Transform used to convert coordinates to sound. 
A production README.

Wireframe
The center of the app will be the drawing plane. Will additional controls to the side of the app.
![wireframe.png](dist/images/wireframe.png)

Architecture and Technologies
There will be a drawing.js file for handling user input and the image, a oscillator.js file for generating sounds from that user input and a frequency_spectrum.js file for converting the sound into visuals frequencies. There will also be a controller.js file for any additional options such as filters or samples (native to the web audio api) to be built in.

For the frequency_spectrum I might use the p5 JS library which builds off of the web audio api.

## Timeline
Day1 setup drawing and sound logic. The end goal of the day is to be able to drow and have sound play.

Day 2 will be dedicated to fixing and bugs and initializing the frequecy analyzer.

Day 3 Will be getting visuals and CSS off the ground. Finishing the day with a navigatable website and the frequency analyzer up and running.

Day 4 Will be another bug fixing day and adding any additional features that time may allow for such as a filter and a sampler.




