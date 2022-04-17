# Load Test
Non-functional Feature - This application will respond to 1000 user requests across 100 accounts per minute concurrently.

# Test Conditions
Number of threads (users) used: 100

Thread duration: 60 seconds
1. Loop Controller (Loop Count = 2)
    1. Add ```Workspace```
    2. Loop Controller (Loop Count = 1)
        1. Add ```Text```
        2. Delete ```Text```
    3. Patch ```Workspace``` Name
    4. Delete ```Workspace```

# Results
| Label              | # Samples | Average | Median  | 90% Line |  95% Line  | 99% Line | Min | Max  | Error % | Throughput  | Received KB/sec | Sent KB/sec |
| ------------------ | --------- | ------- | ------- | -------- | ---------- | -------- | --- | -----| ------- | ----------- | --------------- | ----------- |
| AddWorkspace       | 200       | 725     | 821     | 1052     | 1172       | 1800     | 57  | 1812 | 0.00%   | 24.667      | 9.56            | 5.76        |
| AddText            | 200       | 889     | 991     | 1180     | 1792       | 1810     | 60  | 1905 | 0.00%   | 24.37538    | 9.88            | 6.85        |
| DeleteText         | 200       | 817     | 992     | 1158     | 1180       | 1212     | 56  | 1281 | 0.00%   | 22.29406    | 6.12            | 4.27        |
| PatchWorkspaceName | 200       | 916     | 968     | 1175     | 1278       | 1829     | 63  | 1838 | 0.00%   | 20.27781    | 7.86            | 4.63        |
| DeleteWorkspace    | 200       | 836     | 963     | 1148     | 1179       | 1806     | 57  | 1903 | 0.00%   | 20.29839    | 7.91            | 4.12        |
| TOTAL              | 1000      | 837     | 974     | 1156     | 1204       | 1810     | 56  | 1905 | 0.00%   | 98.32842    | 36.27           | 22.37       |
