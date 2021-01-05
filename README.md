# Echo-Attendence

Echo-based Autonomous Real Time Attendance System in DoS protocol (Data over Sound) using Quiet Modem Project.(Term Project)

## CONTENTS
1. [Abstract](#abstract)
2. [Introduction](#introduction)
3. [Objectives]

## Abstract
Overcoming the difficulties of manual attendance, the Echo-based Realtime (E.A.R.) Attendance System provides an effective and efficient way for recording and maintaining attendance of students in an institute on daily basis. The conventional method of taking attendance by calling names or signing is very timeconsuming, tedious, and insecure. It left a lot of holes in effectiveness, such as missing records, paper consumption, tardy reports, etc.

The attendance is recorded for an Echo receiving device (Microphone) from an Echo sending device (Speaker) and all the records are saved in a RealTime Cloud Database. Data is encoded in unique frequency at the transmitter’s end and sent over sound, which then decoded at receiver’s end and attendance is marked for the day in the cloud database. Attendance recording process is one-shot where, every receiver’s attendance is marked at the same time unlike facial recognition systems or fingerprint-based attendance system. EAR system uses liquid DSR (Software-Defined Radio Digital Signal Processing) to transmit data from the transmitter’s end and to process received data at the receiver’s end.

Moreover, the proposed system eases out the task of capturing specimen of the students (such as fingerprints, facial images, etc.), required for the dataset so as to train the model in case of other autonomous attendance systems and hence, saves time and effort by completely eliminating human intervention and ensures high reliability as well. 

## Introduction
Attendance is a concept used to count the number of persons that have arrived in a certain
venue or incident, individually or as a group, for an earlier planned occasion. Gauging the
attendance is an important task for various enterprises who can utilize this data for
analyzing the efficiency of their activities and preparing for potential endeavors.
The Echo-based Autonomous Real-time (E.A.R.) Attendance System is a framework
evolved for recording students’ attendance regularly. Previously, the task of taking
attendance was heavily dependent on paper records. This system focuses on recording
attendance in a simple and intelligible manner so as to reduce the latency (time) and
resources (paper). The project utilizes the MongoDB cloud database for having a track of
students&#39; details and daily attendance can be used to generate a review of any student
individually. The framework is completely under the control of administrator. The
administrator is provided with a unique 6-character alphanumeric classroom code for
each class that he can distribute among the students of the respective classes. By signing
in, the details of newly joined students are automatically updated in the database. The
administrator can view the attendance report on the dashboard. This system can be used
individually or integrated with any institute&#39;s website where all aspects of a student&#39;s
progress can be directly accessed by the faculties through a secure, online interface.
After the completion of a class, the lecturer has an option to view the student’s attendance
which is reserved in the faculty server, and can evaluate the attendance eligibility criteria
of a student. It also informs the parents, via SMS, about the respective students who are
marked absent in the class. Also, the GUI presented in the system enables the user to use
the system with ease. The scope of this system comprises of the framework having the
program implemented on it, i.e., the software is constructed as a web service, and can be
employed for a certain organization.

## Objectives & Importnce of the Project
The major motive of developing this project is to enable various institutes to automate the
entire attendance system of students by employing the concept of Data over Sound
(DoS). Additionally, this system is designed to help in the management and analysis of
student’s attendance in the institute. The main objectives of this project are as follows:
- Computerizing the process of taking students’ attendance without manual effort.
- Easy maintenance and updating of students’ records.
- Automatic report generation and analysis.
- Quick access to the information related to the students’ attendance through an
interactive dashboard.

The development of this system is crucial to every institute because of its easy and
systematic application of students&#39; attendance. By employing this system, we can reduce
the absenteeism practices followed by students during the classes in the institute, due to
their friends marking their presence while they are absent. This system has been designed
for the benefit of all universities, companies, and schools as it can be employed to
determine whether the person has actually arrived in the class or not. In the lecturer&#39;s
session, their time frame is entirely safe to be provided; the concept of DoS has been
implemented in many different fields, from tracking assets to restricting admittance to
limited fields. Though the application of this concept in the field of education is pristine,
it’s made with the intention of solving day to day problems in various institutes.

## Literature Review

### Existing System
The Existing Program is to be handled by Administrator &amp; Staff members manually.
Here, the attendance has to be managed within handwritten registers. Keeping school
records can be a daunting task. Recovery is not the same easy because records are
kept within the register.

Moreover, the application requires absolute correctness in the case of the input fed in
the respective field. A small mistake in entering the inputs may make the application
resilient to work. Hence, the users may feel difficulty in using it.

#### Demerits of existing system
- Overhead of Resources (Papers) consumption.
- Tedious and Time-consuming.
- Unreliable, due to possibility of human errors.
- Inability to avoid proxy (false) attendance by colleagues.
- Ineffective and outdated.

### Proposed System
To subjugate the challenges in the existing system, the Internet system is designed for
daily visits to students. The program comprises of 2 characters, one is the
Administrator and the other is the Staff/Faculty member, Administrator can be a great
user being able to fabricate any Staff/Faculty member, Class specifications, Student,
as well as broadcast SMSs to the parents, etc. The Staff/Faculty member is a user who
is ready for updating the Attendees taken inside XL Spreadsheets. facilitates access to
specific student travel information. The Attendance information is sent by the school
to the administrator of the relevant class used using the XL sheet provided for them.
This app is useful for assessing student eligibility. Purpose customizing the computer
in a custom way to visit and report automatically at or in the middle of time. The
SMS message is attractive as well as responsive.

#### Merits of the proposed system
- Simplify the route.
- Simple information analysis.
- Better display.
- Reducing reliance on natural resources on paper.
- Simple generation summary of attendees.
- Establish communication among Teachers and Guardians.
- Preprogrammed messages are transmitted to the adults informing their child&#39;s
status whether he or she is present or not within the institution.
- Rapid updating and retrieval of information from the server with a small
response delay.

## Proposed Methodology: Data-over-Sound (DoS)
The utilization of frequency waves or audio-based computerized systems to transmit
information isn&#39;t a new concept. Humans have been using various instruments to transmit
signals, also to generate melody, since long time. Other animals also employ sound
waves – such as dolphins’ sonar for echo-location or bats’ ultrasonics – also as simple
communications among members of various species since many years, the telecom and
telegraph networks are making use of sound technology, like touch-tone (DTMF, dual-
sound multi-vibrational signaling) controls on headsets, encoding modems for data into
telephonic channels, the latter being developed by the IBM within 1940s, while some
have sent information via atmosphere, in acoustic form – or maybe via solid or liquid
objects.
Data can be encoded into audio format by using Data-over-Sound (DoS) technology:
- Either hearable like “bleeps and tones”
- Non-hearable, exceeding the hearing capacity of human beings, or
- “Concealed” like indistinguishable alterations of prevailing music or speech.
After receiving it via microphone on one device, its decoding is done on another device.

Figure 3.1: DoS transmission

Taking into account the formulation, the proximity of the devices as well as the
surroundings, it may run with the connection speeds of near about 50-100bit/s, normally
over that same region.
Data Device Device Data

It is legitimate to ask why a considerably slower and apparently rudimentary type of
signaling such as DoS is required in the very least today. We are continuously
accompanied by multi-megabits (and eventually gigabits) per unit time wireless sharing
of information through Wi-Fi, 4G, and several other advancements. Still, inspite of all
these advances, there remain a range of explanations for the reason they are not able to
encompass all the contingencies and use-cases.
Echo-based communication system features a number of key qualities and capabilities
which cannot be reproduced with ease (or in a reliable manner) along with some other
frameworks. The concept of knowledge over Sound is beneficial because it facilitates:
- Quiet RF Environments
- Usability and ubiquity vs. alternative wireless options
- IoT and legacy support
- Physical/environmental considerations

## Implementation of DoS
The application of the Data over Sound protocol provides two methods for
transmitting the encoded signal from the generating to the receiving device,
namely through audible range wave frequency or by employing Ultrasonic
frequencies. The attendance is recorded for an Echo receiving device
(Microphone) from an Echo sending device (Speaker) and all the records are
saved in a Real-Time Cloud Database. Data is encoded in unique frequency at
the transmitter’s end and sent over the sound, which then decoded at the
receiver’s end and attendance is marked for the day in the cloud database.
The process of recording attendance is a one-shot operation where every
receiver’s attendance is marked at the same time unlike facial recognition
systems or fingerprint-based attendance systems. EAR system uses liquid DSR
(Software-Defined Radio Digital Signal Processing) to transmit data from the
transmitter’s end and to process received data at the receiver’s end.

### Physical/Environmental Considerations
Hearable and near-hearable vibrational frequencies provide some essential
qualities which can render DoS particularly valuable, or make it impossible.
Amongst them, some of the major aspects are as follows:
- Restricted transmission via construction of materials for building the
walls, which implies that the echo is (mainly) restricted over one space
within the classes, believing that the windows and doors have been closed
as well as the noise levels have been reduced.
- The velocity of the sound is slow, which is one among the causes that
restricts the channel capacity of the system.
- In certain cases, ultrasonic pulses can have a larger delay than hearable
signals. This means that they&#39;ll be required to be revised many times in a
loop to receive accurately by a recording device. Ultrasonic transmission
rates are also smaller, and can only utilize around 2kHz (within 18-20kHz)
despite the powerful 15kHz obtainable in the hearable frequency range.
- The channeling of sound may be influenced by the local furniture pieces
or the decorative items present in a venue.

## Encoding Data over Sound
The Encoding and Decoding operations are handled by &quot;quiet-profiles.json&quot;
profiles. Each profile includes a full set of parameters, such as modem type and
error correction.
There are two simple ways for encoding the data onto the sound waves:

- Modulating: This approach takes advantage of the current data source and converts it into
pulses or tones, on the basis of a number of potential encryption algorithms.
Since no other continuous audio track is required, it proves to be better for the
real-time and ad hoc communication systems.

- Watermarking (or Audio-Hiding / Steganography): It includes modifying the current audio signal, such as tunes, by adding extra
(inaudible) information in the channel. This is also used for applications like
the safeguarding of copyrights or the incorporation of additional meta-data in
a specific source (for example, a track-title or an artist).This form of method is
mostly implemented in case of one-to-many or broadcast applications, instead
of ad-hoc device-to-device interaction, since a host audio stream is needed.

## Conclusion
In this project, we have proposed a student monitoring and rollcall management system in which
the students’ attendance is taken in a digitalized &amp; wireless manner. By employing this system,
we’re solving the challenges faced in case of manual entry. Now we are introducing a system
that takes care of the attendance and autonomously updates it in the database, labeling all the
information needed. With the proposed software implemented using AWS EC2 over MongoDB
cloud database primed and completely-functional, the user has now become capable of handling
and hence, executing whole model in a much easier, more reliable, and error-free manner. Also,
the overhead of training the system with colossal datasets is eliminated. The system has also
been designed wherein the marks details as well as the details of the attendance are sent to the
parents/guardians of the respective students via SMS broadcasting.

## Future Scope
The project has immense future possibilities. Besides being integrated into the website, it can
also be implemented in the intranet for a particular enterprise. The framework can be easily
upgraded in the upcoming future as and when required, since it is highly modular and very
flexible in terms of expansion. The following implementations cover the future scope of the
project: 
- Using Ultrasonics for implementing Data over Sound protocol, to reduce the possibility
of system failure in case of a noisy environment.
- Developing a cross-platform application, enabling the application to execute in the
background, so that, the device listens even after the application is closed.
- Individual record based annual student report generation with authentication via digital
signature and facial recognition.
- Addition of a GPS tracker in the student&#39;s mobile system for keeping a check on his/her
current location.
- Implementation of voice recognition-based attendance management activities.

### LICENSE

```
MIT
```
