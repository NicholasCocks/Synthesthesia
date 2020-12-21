# Synthesthesia
Welcome to the Synthethesia wiki! [Live Link](https://nicholascocks.github.io/Synthesthesia/).

## Overview
Synthesthesia is a meditative drawing app that allows users to draw sound and have the canvas dynamically react to their sounds and mouse movements; the application uses an implementation of the Fast Fourier Transformations (FFT) to create a elegant frequency analyzer which the user can adjust the number of discrete data points to.

## Functionality & MVP
With Synthesthesia, users are be able to:

Free-draw onto a canvas and have notes played corresponsding to their mouse's position. 
A frequency analyzer to show the waveforms of the notes they're drawing.
A visual display of the numbers going into the fourier transform.
The ability to select between dynamically colored brushed.

![synthesthesia.gif](dist/images/synthesthesia.gif)

## Architecture and Technologies
CanvasHTML
Web Audio Api
Tone.js

Tone.js, built on the Web Audio Api, was utilized for the Casio sound played when drawing and for help implementing the Frequnecy Analyzer using the Fast Fourier Transformation. The Web Audio Api (native to Javascript) allows for the creation of 'AnalyzerNodes' which link between sound source and destination and can return an array of 'discrete data point' based on the set 'FFT Size'. 
Tone.js builds on top of this by converting the Float value of each discrete data point to decibels; allowing for a exponential scaling of volume rather than linear which more accurately reflexs how humans hear.

CanvasHTML was used for implementing user drawing. A challenge in this is that mouseover events are 'too precise' leading to pixelated, jagged brush strokes and notes being played 'too fast'. This lead to the buidling of a system to record mouseover events into a queue data structure and then calculate quadratic curves based on mouse position, leading to slightly 'corrected' brush strokes that gave a more natural feel and smoother edges. This also allowed for easy debouncing of events that would trigger notes and for dynamically colored brushes. It was definitely the key insight to the project.

Wireframe
The center of the app will be the drawing plane. Will additional controls to the side of the app.
![wireframe.png](dist/images/wireframe.png)

## Timeline
Setup drawing logic. Ability to draw and have mouse position returned for each mouseover event.  

Day 2 will be dedicated to fixing and bugs and initializing the frequecy analyzer.

Day 3 Will be getting visuals and CSS off the ground. Finishing the day with a navigatable website and the frequency analyzer up and running.

Day 4 Will be another bug fixing day and adding any additional features that time may allow for such as a filter and a sampler.




