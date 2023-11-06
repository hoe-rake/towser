/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import MatchForm from '../../MatchForm'

test('greeting', () => {
    render(<MatchForm />)
})
