type Success<T> = [T, null];
type Failure<E> = [null, E];

type Result<T, E> = Success<T> | Failure<E>;
type PromiseResult<T, E> = Promise<Result<T, E>>;

type Operation<T> = Promise<T> | (() => T);

type Output<T, E> = PromiseResult<T, E> | Result<T, E>;

const onSuccess = <T>(value: T): Success<T> => [value, null];
const onFailure = <E>(error: E): Failure<E> => [null, error];

export const tryCatch = <T, E>(operation: Operation<T>): Output<T, E> => {
  if (operation instanceof Promise) {
    return operation.then(onSuccess).catch(onFailure);
  }

  try {
    const value = operation();
    return [value, null];
  } catch (error) {
    return [null, error as E];
  }
};
