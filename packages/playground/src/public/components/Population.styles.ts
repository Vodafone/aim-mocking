import styled, { css } from 'styled-components'

export const Container = styled.div(
  () => css`
    border: 1px solid #cacaca;
    padding: 10px 20px;
    background: #e7e7e7;
    margin-top: 60px;

    p {
      font-size: 17px;
      font-weight: 100;
      color: #3e3e3e;
      letter-spacing: 1px;
    }
  `,
)

export const Items = styled.div(
  () => css`
    display: flex;
    justify-content: space-between;
    border: 1px solid #cacaca;
    padding: 10px 20px;
  `,
)

export const Item = styled.div(
  () => css`
    border: 1px solid #cacaca;
    padding: 10px;
    font-size: 14px;
    background: #fcfcfc;
  `,
)
