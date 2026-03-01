import { NextResponse } from 'next/server';
import { runChainOfResponsibilityTask } from '@/lib/patterns/chain-of-responsibility';
import { runMediatorTask } from '@/lib/patterns/mediator';
import { runObserverTask } from '@/lib/patterns/observer';
import { runStrategyTask } from '@/lib/patterns/strategy';
import { runMementoTask } from '@/lib/patterns/memento';

export async function GET() {
  console.log('\n========================================');
  console.log('=== ЗАПУСК ЛАБОРАТОРНОЇ РОБОТИ №4 ===');
  console.log('========================================\n');

  try {
    runChainOfResponsibilityTask();
    runMediatorTask();
    runObserverTask();
    runStrategyTask();
    runMementoTask();

    console.log('\n=== РОБОТУ ЗАВЕРШЕНО ===\n');

    return NextResponse.json({
      status: 'success',
      message: 'Перевірте термінал для перегляду логів',
    });
  } catch (error) {
    console.error('Error during execution:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Помилка виконання. Перевірте термінал.',
      },
      { status: 500 }
    );
  }
}