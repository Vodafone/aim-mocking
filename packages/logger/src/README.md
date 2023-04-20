Logger

# Usage

```
import logger from './modules/logger';
```

# Yarn

Logger yarn is a pretty console log.
It's totally OK to commit those console logs into production code.

## Spinner

Create new spinner
`logger.yarn.spinner('Loading ...');`

Resolve spinner without chainging text
`logger.yarn.spinner().resolve();`

Resolve spinner and change text
`logger.yarn.spinner().resolve('Loading done!');`

Reject spinner without changing text
`logger.yarn.spinner().reject('Loading done!');`

Reject spinner and change text
`logger.yarn.spinner().reject('Loading failed!');`

## appStart

logger.yarn.appStart(title, description);

## Info

logger.yarn.info(title, value);

## Status

logger.yarn.status(title, description, status);

## Section

logger.yarn.section(title, description)

## Sub Section

logger.yarn.subSection(title);

## Divider

logger.yarn.divider();

## Success

logger.yarn.success(message, ...values);

# Log interface ( logger.log )

Simple error message
`logger.log.error('Error message');`

Error message with description
`logger.log.error('Error message', 'Description');`

Error message with object and new line character
`logger.log.error('Error message', '\n Description', { data: 'my data' });`

Simple warn message
`logger.log.warn('Warn message');`

Warn message with description
`logger.log.warn('Warn message', 'Description');`

Warn message with object and new line character
`logger.log.warn('Warn message', '\n Description', { data: 'my data' });`

Simple info message
`logger.log.info('info message');`

Info message with description
`logger.log.info('info message', 'Description');`

Info message with object and new line character
`logger.log.info('info message', '\n Description', { data: 'my data' });`

Simple log message
`logger.log.log('log message');`

Log message with description
`logger.log.log('log message', 'Description');`

Log message with object and new line character
`logger.log.log('log message', '\n Description', { data: 'my data' });`

Simple debug message
`logger.log.debug('debug message');`

Debug message with description
`logger.log.debug('debug message', 'Description');`

Debug message with object and new line character
`logger.log.debug('debug message', '\n Description', { data: 'my data' });`
