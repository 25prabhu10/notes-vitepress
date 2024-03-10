---
title: Matrices
description: Matrices
---

# Matrices

1. Diagonal Matrix: A square matrix in which every element except the main diagonal elements is zero is called a Diagonal Matrix. A matrix _M_ of size _ixj_ should have `M[i,j] = 0 if i != j`.

   ```c
   struct Matrix
   {
       int A[10];
       int n;
   };

   void Set(struct Matrix *m, int i, int j, int x)
   {
       if (i == j)
           m->A[i - 1] = x;
   }

   int Get(struct Matrix *m, int i, int j)
   {
       if (i == j)
           return m->A[i - 1];

       return 0;
   }

   void Display(struct Matrix m)
   {
       int i, j;

       for (i = 0; i < m.n; i++)
       {
           for (j = 0; j < m.n; j++)
               if (i == j)
                   printf("%d ", m.A[i]);
               else
                   printf("0 ");

           printf("\n");
       }
   }

   int main()
   {
       struct Matrix m;

       m.n = 4;

       Set(&m, 1, 1, 5);
       Set(&m, 2, 2, 7);
       Set(&m, 3, 3, 4);
       Set(&m, 4, 4, 9);

       printf("(3, 3): %d", Get(&m, 3, 3));

       Display(m);

       return 0;
   }

   // OUTPUT:
   // (3, 3): 4
   //
   // 5 0 0 0
   // 0 7 0 0
   // 0 0 4 0
   // 0 0 0 9
   ```

   ```cpp
   class Diagonal
   {
   private:
       int n;
       int *A;

   public:
       Diagonal();
       Diagonal(int n);
       ~Diagonal();

       void Set(int i, int j, int x);
       int Get(int i, int j);
       void Display();
   };

   Diagonal::Diagonal()
   {
       A = new int[2];
       this->n = 2;
   }

   Diagonal::Diagonal(int n)
   {
       A = new int[size];
       this->n = n;
   }

   Diagonal::~Diagonal()
   {
       delete[] A;
   }

   void Diagonal::Set(int i, int j, int x)
   {
       if (i == j)
           A[i - 1] = x;
   }

   int Diagonal::Get(int i, int j)
   {
       if (i == j)
           return A[i - 1];

       return 0;
   }

   void Diagonal::Display()
   {
       int i, j;

       for (i = 0; i < n; i++)
       {
           for (j = 0; j < n; j++)
               if (i == j)
                   printf("%d ", A[i]);
               else
                   printf("0 ");

           printf("\n");
       }
   }

   int main()
   {
       Diagonal m(4);

       m.Set(1, 1, 5);
       m.Set(2, 2, 7);
       m.Set(3, 3, 4);
       m.Set(4, 4, 9);

       printf("(3, 3): %d", m.Get(3, 3));

       m.Display();

       return 0;
   }

   // OUTPUT:
   // (3, 3): 4
   //
   // 5 0 0 0
   // 0 7 0 0
   // 0 0 4 0
   // 0 0 0 9
   ```

2. Lower Triangular Matrix: A square matrix is called lower triangular if all the entries above the main diagonal are zero. A matrix _M_ of size _ixj_ should have `M[i,j] = 0 if i < j`

   - Row major implementation:

     ```c
     struct Lower
     {
         int *A;
         int n;
     };

     void Set(struct Lower _m, int i, int j, int x)
     {
         if (i >= j)
         m->A[((i _ (i - 1)) / 2) + (j - 1)] = x;
     }

     int Get(struct Lower _m, int i, int j)
     {
         if (i >= j)
             return m->A[((i _ (i - 1)) / 2) + (j - 1)];

         return 0;
     }

     void Display(struct Lower m)
     {
         int i, j;

         for (i = 1; i <= m.n; i++)
         {
             for (j = 1; j <= m.n; j++)
                 if (i >= j)
                     printf("%d ", m.A[((i * (i - 1)) / 2) + (j - 1)]);
                 else
                     printf("0 ");

             printf("\n");
         }
     }

     int main()
     {
         struct Lower m;
         int i, j, temp = 0;

         printf("Enter Dimensions: ");
         scanf("%d", &m.n);

         m.A = (int *)malloc(((m.n * (m.n - 1)) / 2) * sizeof(int));

         printf("Enter all elements:\n");

         for (i = 1; i <= m.n; i++)
             for (j = 1; j <= m.n; j++)
             {
                 scanf("%d", &temp);
                 Set(&m, i, j, temp);
             }

         printf("\n\n\n(3, 3): %d \n\n", Get(&m, 3, 3));

         Display(m);

         return 0;
     }

     // OUTPUT:
     // (3, 3): 4
     //
     // 5 0 0 0
     // 7 9 0 0
     // 6 3 4 0
     // 0 8 0 10
     ```

3. Upper Triangular Matrix

4. Symmetric Matrix

5. Tridiagonal Matrix

6. Band Matrix

7. Toeptitz Matrix

8. Sparse Matrix: A sparse matrix is a matrix that is comprised of mostly zero values.
