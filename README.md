# How to add any new problem

## Step 1:

### Generate the problem structure (No need to write the function for every language)

## How to Define the Input and output field

```
int
float
char
string
double
vector<int>
vector<char>
vector<bool>
vector<string>
vector<long>
vector<long long>
vector<float>
vector<double>
vector<vector<int>>
vector<vector<long>>
vector<vector<long long>>
vector<vector<char>>
vector<vector<bool>>
vector<vector<string>>
vector<vector<float>>
vector<vector<double>>
```

## How to define the vector<type> or vector<vector<type>>

```
For number | string | bool | char | float | double | long | long long

For number
10

For string
aman

For bool
true | false

For char
a

n-> size of array
1 2 3 4 5 6 ... n (no comma or anyspecial character between the numbers or any other datatype)

n-> size of array
aman meenia aman aman .... upto n

For 2-d array
n m n-> no of rows m-> no of columns (currently same number of elements is supported)

3 5
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15



```

## How structure.md should look like

```
Problem Name: "Max Pair Sum"
Difficulty: "easy"  ["easy" , "medium" , "hard"]
Type: "regularProblem" ["regularProblem" ,"contest"]
Function Name: "maxPairSum"
Input Structure:
Input Field: vector<int> arr
Output Structure:
Output Field: int

```

### For multiple input

```
Just add the new line with inputField
Problem Name: "Max Pair Sum"
Function Name: "maxPairSum"
Input Structure:
Input Field: int n
Input Field: vector<vector<int>> temp
Output Structure:
Output Field: string
```

## Step 2:

### How to write the problem description

````

# 1.Maximum pair sum (Write the problem name)

&nbsp;

#### (write problem description) Given an array of numbers, find the maximum pair sum of the given array.And we can not use the same element twice.

&nbsp;

**Example 1:**

&nbsp;

**Input**

```code2
[1, 2, 3, 4, 5, 4, 12, 4]
````

&nbsp;

**Output**

```
17
```

&nbsp;

**Example 2:**

&nbsp;

**Input**

```
[1, 100, 12 ,50, 90, 12]
```

&nbsp;

**Output**

```
190
```

&nbsp;

### Constraints

&nbsp;

- 1 <= n <= 10^5

  &nbsp;

- -10^9 <= A[i] <= 10^9

  &nbsp;

```

```

## After defining the problem structure and problem description now you have to generate the boilerplate and full boilerplate for the problem.

## How to generate boilerplate

```
Go to directory = logiclab/boilerPlateGenerator/src

npx ts-node generateCode.ts "../../problems/Longest-Palindrome-Substring"
npx ts-node generateCode.ts "../../problems/{Enter your new added problem folder name}"

By running this command a new folder name as boilerplate is generated which contains boilerplate for the different languages.

```

## How to generate default testcase.md

```
Go to directory = logiclab/boilerPlateGenerator/src/defaultTestcase
ts-node generateTestCase.ts  "../../../problems/Longest-Palindrome-Substring"

```

## To push problem to database (only admin can push the problem to database)

```
Go to directory = logiclab/boilerPlateGenerator/src/addProblem
ts-node problem.ts "../../../problems/Longest-Palindrome-Substring" "secret"

For update
ts-node problem.ts "../../../problems/Longest-Palindrome-Substring" "secret" "update"
```

# How to convert the "14-09-2024 20:00:00" to "2024-09-14T20:00:00.000Z"

```
dir = logiclab/boilerPlateGenerator/src/contest
 ts-node dateGeneration.ts "14-09-2024 20:00:00"
```

# How to add contest

```
contestName: "Contest Name"
description: "Contest Description"
contestCreator: "Contest Creator"
startTime: Date (Contest must be of 90 minute)
endTime: 2024-07-14T16:00:00.000Z
problem1: "Problem Name" (problemName = "Folder name of the problem")
problem2: "Problem Name" (problemName = "Folder name of the problem")
problem3: "Problem Name" (problemName = "Folder name of the problem")
problem4: "Problem Name" (problemName = "Folder name of the problem")
```

# How to Add the contest to the database (only admin)

```
Go to directory = logiclab/boilerPlateGenerator/src/contest
ts-node generateContest.ts "../../../contests/contest1.txt"

```
