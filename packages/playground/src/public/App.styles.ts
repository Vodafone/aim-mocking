import styled, { css } from 'styled-components'

export const Container = styled.div(
  () => css`
    padding: 0;
  `,
)

export const Header = styled.div(
  () => css`
    width: 100%;
    color: #e00201;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 40px;
    text-align: center;
    background: #e7e7e7;
    border: 1px solid #cacaca;
    padding: 20px;
  `,
)
